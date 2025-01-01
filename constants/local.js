import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from './../api/user.api';

export const getFromStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log(error);
        return null;
    }
    return null;
}

export const saveToStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export const getLanguages = async (setLanguage) => {
    const language = await getFromStorage("language") || "en";
    setLanguage(language);
    return;
}

export const getUser = async (setUser) => {
    const StorageUser = await getFromStorage("user") || null;
    const body = {
        password: StorageUser?.password,
        access: StorageUser?.email || StorageUser?.phone
    }
    const user = StorageUser && await login(body).then((res) => res?.data).catch((error) => console.log("error", error, "code:provider"));
    console.log(user);
    setUser(user);
    return;
}
