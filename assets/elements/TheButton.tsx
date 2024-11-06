import { Pressable, StyleSheet, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React, { ReactNode, useState } from 'react';
import { useTheme } from '../../hooks/ThemeContext';
import styled from 'styled-components/native';
import { Txt } from './Elements';

const PressableStyled = styled(Pressable) <{ isHovered: boolean; isPressed: boolean; }>`
    background-color: ${({ isPressed, isHovered, theme }) =>
        isPressed ?  `${theme.buttonBgc}50` : isHovered ? `${theme.buttonBgc}90`  : theme.buttonBgc};
`;

interface TheButtonProps {
    buttonStyle?: StyleProp<ViewStyle>;
    onPress: () => void;
    title?: string;
    textStyle?: StyleProp<TextStyle>;
    children?: ReactNode;
}

const TheButton: React.FC<TheButtonProps> = React.memo(({
    buttonStyle,
    onPress,
    title,
    textStyle,
    children
}) => {
    const { colorTextElement } = useTheme();
    const [isHovered, setHovered] = useState(false);
    const [isPressed, setPressed] = useState(false);

    return (
        <PressableStyled
            onPress={onPress}
            onHoverIn={() => setHovered(true)}
            onHoverOut={() => setHovered(false)}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            isHovered={isHovered}
            isPressed={isPressed}
            style={{ ...styles.button, ...buttonStyle }}
        >
            {children ?? (
                <Txt style={{
                    ...styles.text,
                    ...textStyle,
                }}>
                    {title || "button"}
                </Txt>
            )}
        </PressableStyled>
    );
});

export default TheButton;

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignContent: 'center',
        alignSelf: 'baseline',
        margin: 5,
        padding: 5,
    }
});
