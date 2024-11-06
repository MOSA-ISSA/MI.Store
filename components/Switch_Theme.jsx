import React from 'react'
import SwitchCustom from 'expo-custom-switch';
import { useTheme } from '../hooks/ThemeContext';

const Switch_Theme = () => {
    const { toggleTheme, isDarkTheme } = useTheme();
    return (
        <SwitchCustom
            value={isDarkTheme}
            onChange={(value) => toggleTheme(value)}
            // onChange={toggleTheme}
            leftColor="#1E1F36"
            rightColor="#1F92C0"
            iconLeft={{
                name: 'brightness-3',
                color: '#1F92C0',
                style: {
                    height: 22,
                    width: 22,
                },
            }}
            iconRight={{
                name: 'brightness-5',
                color: '#1E1F36',
                style: {
                    height: 22,
                    width: 22,
                },
            }}
        />
    )
}

export default Switch_Theme
