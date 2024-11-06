import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkThemeStyled, lightThemeStyled } from '../assets/ColorsTheme';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(useColorScheme() === 'dark');

    const storageDarkTheme = async () => {
        const value = await AsyncStorage.getItem('isDarkTheme');
        if (value !== null) {
            setIsDarkTheme(JSON.parse(value));
        }
    }
    const toggleTheme = () => {
        setIsDarkTheme((prevTheme) => !prevTheme);
        AsyncStorage.setItem('isDarkTheme', JSON.stringify(!isDarkTheme));
    };

    const theme = isDarkTheme ? darkThemeStyled : lightThemeStyled;
    const colorText = isDarkTheme ? "#1E1F36" : "#1F92C0";
    const colorTextElement = isDarkTheme ? "#1E1F36" : "#1F92C0";
    const bgcColor = isDarkTheme ? "#1F92C0": '#1E1F36' ;

    useEffect(() => {
        storageDarkTheme();
    }, [])


    return (
        <ThemeContext.Provider value={{
            isDarkTheme, toggleTheme,
            colorText,
            colorTextElement,
            bgcColor
        }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};