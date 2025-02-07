import "./ProductCard.css";
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import TheButton from '../assets/elements/TheButton';
import { Txt } from '../assets/elements/Elements';
import { useNavigation } from 'expo-router';

const size = Dimensions.get('window');
const cardWidth = size.width * 0.2;

const ProductCard = (props) => {
    const navigation = useNavigation();
    const { name, price, image, } = props
    const [ImageUrl, setImageUrl] = useState(image)
    // const globalWidth = window.innerWidth
    const [container_width, set_container_width] = useState(cardWidth);

    const handleNavigate = useCallback(() => {
        navigation.navigate("Product", { product_id: props._id })
    }, [])

    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth);

            set_container_width(cardWidth);
        };

        const subscription = Dimensions.addEventListener('change', handleResize);

        return () => subscription?.remove();
    }, []);

    return (
        <TheButton
            // id={'card'}
            isCard={true}
            onPress={handleNavigate}
            buttonStyle={{ ...styles.card, width: container_width }}
        >
            {/* <Image
                source={{ uri: ImageUrl || "https://raw.githubusercontent.com/MOSA-ISSA/images/refs/heads/master/canvas-48.jpg" }}
                onError={() => setImageUrl("https://raw.githubusercontent.com/MOSA-ISSA/images/refs/heads/master/canvas-48.jpg")}
                resizeMode='cover'
                style={styles.image}
            />
            <Txt numberOfLines={1} ellipsizeMode="tail" style={styles.txt}>{name || "name"}</Txt>
            <Txt style={styles.txt}>₪{price || "price"}</Txt> */}
        </TheButton>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        padding: 4,
        margin: 4,
        maxWidth: 300,
        maxHeight: 300,
        // width: '100',
        // width: size.width * 0.3,
        // height: Platform.OS === 'web' ? size.width * 0.3 : 180,
        borderRadius: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: "100%",
        marginBottom: 2,
        borderRadius: 8,
    },
    txt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
