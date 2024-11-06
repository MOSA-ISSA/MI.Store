import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const language = await getFromStorage("language")||"en";
    setLanguage(language);
    return;
} 
