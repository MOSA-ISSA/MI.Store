import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Cover, IconFeather, Txt } from './../assets/elements/Elements';
import TheContext from './../hooks/TheContext';
import { saveToStorage } from '@/constants/local';
import { useNavigation } from 'expo-router';
import TheButton from './../assets/elements/TheButton';

const User = () => {
    const { user, setUser } = useContext(TheContext);
    const navigation = useNavigation();

    const logOut = () => {
        setUser(null);
        saveToStorage('user', null);
        navigation.replace('index');
    };

    const features = [
        { title: 'Payment', icon: 'credit-card', action: () => console.log('Go to Payment') },
        { title: 'Your Wishlist', icon: 'heart', action: () => console.log('Go to Wishlist') },
        { title: 'In Cart', icon: 'shopping-cart', action: () => console.log('Go to Cart') },
        { title: 'Order History', icon: 'package', action: () => console.log('Go to Order History') },
        { title: 'Help Center', icon: 'help-circle', action: () => console.log('Go to Help Center') },
        { title: 'Notifications', icon: 'bell', action: () => console.log('Go to Notifications') },
        { title: 'Logout', icon: 'log-out', action: () => logOut() },
    ];

    return (
        <Cover style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* User Details */}
                <View style={styles.userDetails}>
                    <View>
                        <Txt style={styles.name}>{user?.name || 'Guest User'}</Txt>
                        <Txt style={styles.email}>{user?.email || ''}</Txt>
                        <Txt style={styles.email}>{user?.phone || ''}</Txt>
                    </View>
                    <IconFeather name='settings' size={24} onPress={() => navigation.navigate('Settings')} />
                </View>

                {/* Features Section */}
                <View style={styles.features}>
                    {features.map((feature, index) => (
                        <TheButton
                            key={index}
                            buttonStyle={styles.featureButton}
                            onPress={feature.action}
                        >
                            <IconFeather name={feature.icon} size={24} />
                            {/* <Text style={styles.featureIcon}>{feature.icon}</Text> */}
                            <Text style={styles.featureText}>{feature.title}</Text>
                        </TheButton>
                    ))}
                </View>
            </ScrollView>
        </Cover>
    );
};

export default User;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    userDetails: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 600,
        gap: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 14,
    },
    features: {
        width: '90%',
    },
    featureButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 2,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 700,
    },
    featureIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    featureText: {
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
