import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Dimensions, Text } from 'react-native';
import TheButton from './TheButton';
import { Container, Icon, IconFeather, ThemView, Txt } from './Elements';
import { useTheme } from '../../hooks/ThemeContext';
import LanguageModal from './LanguageModal';
import STRINGS from './../Strings';
import TheContext from '@/hooks/TheContext';
import SearchBar from './../../components/SearchBar';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const HeaderStyled = styled(View)`
    background-color: ${({ theme }) => theme.card};
`;

const HeaderApp = ({ options, navigation, route, ...props }) => {
    const { toggleTheme, isDarkTheme } = useTheme();
    const { Language, setLoginState, user } = useContext(TheContext);
    const [modal, setModal] = useState(false);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(Dimensions.get('window').width);
        };

        const subscription = Dimensions.addEventListener('change', handleResize);

        return () => subscription?.remove();
    }, []);

    const LiftSide = () => {
        return (
            <View style={styles.leftSide}>
                {route.name !== 'Home' ? (
                    <TheButton buttonStyle={styles.btn} onPress={() => {
                        if (navigation?.openDrawer) {
                            navigation?.openDrawer?.()
                        } else if (navigation?.goBack && Platform.OS !== 'web') {
                            navigation?.goBack()
                        } else {
                            window.history.back()
                        }
                    }}>
                        <Icon name={navigation?.openDrawer ? "menu" : "arrow-long-left"} size={24} />
                    </TheButton>
                ) :
                    <TheButton
                        buttonStyle={styles.btn}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Icon name="shopping-cart" size={24} />
                    </TheButton>
                }
                <IconFeather
                    style={styles.icon}
                    name={isDarkTheme ? 'sun' : 'moon'}
                    onPress={toggleTheme}
                    size={24}
                />
                {route.name !== 'Search' &&
                    <IconFeather
                        style={styles.icon}
                        name="search"
                        onPress={() => navigation.navigate('Search')}
                        size={24}
                    />
                }
            </View>
        );
    };

    const Title = () => (
        <Txt style={styles.headerTitle}>
            {
                screenWidth >= 250 ? (
                    STRINGS?.[route.name]?.[Language]
                    || options.drawerLabel
                    || options.title
                    || route.name
                    || 'MI.store'
                ) : 'MI'
            }
        </Txt>
    )

    const RightSide = () => {
        return (
            <View style={styles.rightSide}>
                <Txt style={{ margin: 4 }}>{user?.name || "log in"}</Txt>
                <TheButton
                    buttonStyle={styles.user}
                    onPress={() => user?.name ? navigation.navigate('User') : setLoginState(true)}
                >
                    <IconFeather name="user" size={20} />
                </TheButton>
                <IconFeather
                    // style={styles.icon}
                    name={"more-vertical"}
                    onPress={() => setModal(!modal)}
                    size={24}
                />

                <LanguageModal
                    visible={modal}
                    onClose={() => setModal(false)}
                />
            </View>
        );
    }

    return (
        <ThemView style={styles.header}>
            <HeaderStyled style={styles.headerContainer}>
                <Title />
                <LiftSide />
                <View style={styles.flexed} />
                <RightSide />
                {route.name === 'Home' &&
                    <Txt style={styles.cartCount}>0</Txt>
                }
            </HeaderStyled>
        </ThemView>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'stretch',
        justifyContent: 'center',
        alignSelf: 'stretch',
        height: 50,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
        borderTopWidth: 1,
        borderColor: '#00000025',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        height: 50,
    },
    headerTitle: {
        position: 'absolute',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        left: 0,
        right: 0,
    },
    icon: {
        paddingLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    user: {
        borderRadius: 100,
        margin: 0,
        alignSelf: 'center'
    },
    cartCount: {
        margin: 0,
        position: 'absolute',
        top: 0,
        left: 30,
        fontWeight: 'bold',
        backgroundColor: "#FFFFFF20",
        borderRadius: 100,
        paddingHorizontal: 5,
        textAlign: 'right',
    },
    rightSide: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        height: 45,
    },
    leftSide: {
        alignSelf: 'stretch',
        height: 45,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    flexed: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
        width: '100%',
        height: 45,
        maxWidth: 600,
    },
    btn: {
        margin: 0,
        marginRight: 0,
        borderRadius: 100,
        alignSelf: 'center',
    }
});

export default HeaderApp;
