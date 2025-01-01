import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Cover, Txt } from '../assets/elements/Elements';
import TheButton from '../assets/elements/TheButton';
import { jwtDecode } from "jwt-decode";
import { activateUser } from '../api/user.api';
import { saveToStorage } from '../constants/local';

const Activation = () => {
    const params = useLocalSearchParams();
    const token = params.token;
    const navigation = useNavigation();
    const [Loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const decodeToken = async () => {
        if (!token) {
            console.log('No token provided');
            setLoading(false);
        }
        try {
            const decoded = jwtDecode(token);
            console.log('Decoded Token:', decoded);
            setUser(decoded);
            setLoading(false);
        } catch (error) {
            console.error('Invalid or expired token:', error.message);
        }
    }

    const activateUserApi = async () => {
        setLoading(true);
        activateUser({_id: user._id})
        .then((res) => {
            console.log(res);
            if (!res?.success) throw new Error(res.message);
            saveToStorage("user", res?.data);
            setUser(res?.data);
            navigation.reset({ index: 0, routes: [{ name: 'index' }] });
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        decodeToken();
    }, []);

    return (
        <Cover style={styles.center}>
            {Loading ? <ActivityIndicator size={"large"} /> :
                user ?
                    <TheButton buttonStyle={styles.btn} onPress={() => activateUserApi()}>
                        <Txt style={styles.txt}>Activate {user?.name + " account" || "user"}</Txt>
                    </TheButton>
                    :
                    <Txt style={styles.txt}>Invalid</Txt>
            }
        </Cover>
    )
}

export default Activation

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        alignItems: 'center',
        padding: 20,
        borderRadius: 8,
    },
})