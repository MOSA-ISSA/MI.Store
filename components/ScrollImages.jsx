import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Button, Dimensions, Text, Image, Linking } from 'react-native';
import { IconFeather, Txt } from '../assets/elements/Elements';
import TheButton from '../assets/elements/TheButton';
import index from './../app/index';

const { width } = Dimensions.get('window');

const ScrollImages = ({
    images,
    styleFatherContainer,
    style_images_btn_container,
    styleScrollImages,
    styleImages,
    Height,
    Width,
    maxWidth,
    resizeMode,
    styleArrow,
    styleDots,
    styleContainerImages
}) => {
    const Images = images || ["1", "2", "3"]
    const _container_width = width * 0.95;
    const [currentPageState, setCurrentPageState] = useState(0);
    const [container_width, set_container_width] = useState(Width || _container_width);
    const totalPages = Images.length;
    const scrollViewRef = useRef(null);
    const currentPage = useRef(0);

    useEffect(() => {
        const handleResize = () => {
            set_container_width(Dimensions.get('window').width * 0.95);
        };

        const subscription = Dimensions.addEventListener('change', handleResize);

        return () => subscription?.remove();
    }, []);

    const scrollToNextPage = () => {
        console.log(currentPageState === totalPages - 1);
        console.log(currentPageState, totalPages - 1);

        if (currentPageState === totalPages - 1) {
            currentPage.current = 0;
        } else {
            currentPage.current += 1;
        }
        scrollViewRef.current.scrollTo({ x: currentPage.current * container_width, animated: true });
    };

    const scrollToPreviousPage = () => {
        if (currentPageState === 0) {
            currentPage.current = totalPages - 1;
        } else {
            currentPage.current -= 1;
        }
        scrollViewRef.current.scrollTo({ x: currentPage.current * container_width, animated: true });
    };

    const handleCurrentPageState = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(contentOffsetX / container_width);
        if (page !== currentPageState) {
            currentPage.current = page;
            setCurrentPageState(page);
        }
    }

    const handleScroll = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;

        if (currentPage.current >= totalPages - 1) {
            currentPage.current = 0;
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
        }
        else if (contentOffsetX === 0) {
            currentPage.current = totalPages - 1;
            scrollViewRef.current.scrollTo({ x: (totalPages - 1) * container_width, animated: true });
        }
        // }
    };

    const dotPress = (index) => {
        scrollViewRef.current.scrollTo({ x: index * container_width, animated: true });
    }

    // console.log(currentPageState);


    return (
        <View style={{ ...styles.container, ...styleFatherContainer }}>
            {/* <Txt>{currentPageState}</Txt> */}
            <View style={{ ...styles.scrollViewContainer, ...style_images_btn_container }}>
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    snapToAlignment="center"
                    style={{ ...styles.scrollView, ...styleScrollImages, height: Height, width: Width || container_width, maxWidth: maxWidth || 600 }}
                    onScroll={handleCurrentPageState}
                    // onPointerDown={(e) => { console.log('down',e) }}
                    onScrollEndDrag={handleScroll}
                    scrollEventThrottle={16}
                >
                    {
                        Images.map((item, index) => (
                            <View key={index} style={{ ...styles.images, ...styleContainerImages, height: Height || 300, width: Width || container_width, maxWidth: maxWidth || 600 }}>
                                <Image
                                    resizeMode={'contain' || resizeMode} style={{ ...styles.style_Image, ...styleImages }}
                                    source={{ uri: item }}
                                    defaultSource={{ uri: 'https://raw.githubusercontent.com/MOSA-ISSA/images/refs/heads/master/canvas-48.jpg' }}
                                />
                            </View>
                        ))
                    }
                </ScrollView>
                <TheButton buttonStyle={{ ...styles.arrows, left: -5, ...styleArrow }} onPress={scrollToPreviousPage}>
                    <IconFeather name='arrow-left-circle' size={24} />
                </TheButton>
                <TheButton buttonStyle={{ ...styles.arrows, right: -5, ...styleArrow }} onPress={scrollToNextPage}>
                    <IconFeather name='arrow-right-circle' size={24} />
                </TheButton>
            </View>
            <View style={styles.dots}>
                {Images.map((item, index) => (
                    <IconFeather
                        onPress={() => dotPress(index)}
                        key={index}
                        name="circle"
                        size={10}
                        style={[{ paddingHorizontal: 5, ...styleDots }, index !== currentPageState && { color: '#4545' }]} />
                ))}
            </View>
        </View>
    );
};

{/* backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` */ }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        borderRadius: 10,
    },
    scrollViewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },
    scrollView: {
        flex: 1,
        borderRadius: 10,
    },
    images: {
        height: 200,
        padding: 10,
        borderRadius: 10,
    },
    style_Image: {
        flex: 1,
        // borderWidth: 3,
        // borderColor: '#000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#45454520',
    },
    arrows: {
        position: 'absolute',
        top: '40%',
        borderRadius: 100,
        padding: 10,
    },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    }
});

export default ScrollImages;
