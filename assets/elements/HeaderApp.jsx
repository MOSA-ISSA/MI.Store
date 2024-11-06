import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import TheButton from './TheButton';
import styled from 'styled-components/native';
import { Icon, IconFeather, Txt } from './Elements';
import { useTheme } from '../../hooks/ThemeContext';
import LanguageModal from './LanguageModal';
import STRINGS from './../Strings';
import TheContext from '@/hooks/TheContext';

const size = Dimensions.get('window');

const HeaderStyled = styled(View)`
    background-color: ${({ theme }) => theme.card};
`;

const HeaderApp = ({ options, navigation, route, ...props }) => {
    const { toggleTheme, isDarkTheme } = useTheme();
    const { Language } = useContext(TheContext);
    const [modal, setModal] = useState(false);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(Dimensions.get('window').width);
        };

        const subscription = Dimensions.addEventListener('change', handleResize);

        return () => subscription?.remove();
    }, []);

    const RightHeder = () => {
        return (
            <View>
                {route.name !== 'Home' ? (
                    <TheButton buttonStyle={{ margin: 0 }} onPress={() => {
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
                        buttonStyle={{ margin: 0, marginRight: 0, borderRadius: 100 }}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Icon name="shopping-cart" size={24} />
                    </TheButton>
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

    return (
        <HeaderStyled style={styles.headerContainer}>
            <Title />
            <RightHeder />

            <IconFeather
                style={styles.icon}
                name={isDarkTheme ? 'sun' : 'moon'}
                onPress={toggleTheme}
                size={24}
            />

            <View style={styles.headerTitleContainer} />
            <Txt style={{ margin: 4 }}>mosa</Txt>
            <TheButton
                buttonStyle={{ borderRadius: 100, margin: 0, alignSelf: 'center' }}
                onPress={() => navigation.navigate('User')}
            >
                <IconFeather name="user" size={20} />
            </TheButton>
            <IconFeather
                // style={styles.icon}
                name={"more-vertical"}
                onPress={() => setModal(!modal)}
                size={24}
            />
            {/* 
            <TheButton
                        buttonStyle={{ margin: 0, borderRadius: 100 }}
                        onPress={() => setModal(!modal)}
                    >
                        <Icon name="language" size={24} />
            </TheButton> 
            */}
            <LanguageModal
                visible={modal}
                onClose={() => setModal(false)}
            />
            {route.name === 'Home' && <Txt style={styles.cartCount}>0</Txt>}
        </HeaderStyled>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 2,
        borderTopWidth: 1,
        borderColor: '#00000025',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        height: 50,
    },
    headerTitleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingRight: 15,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        // backgroundColor:
    },
    user: {
        margin: 0,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartCount: {
        margin: 0,
        position: 'absolute',
        top: 0,
        left: 35,
        fontWeight: 'bold',
        backgroundColor: "#FFFFFF20",
        borderRadius: 100,
        paddingHorizontal: 5,
        textAlign: 'right',
    },
});

export default HeaderApp;
