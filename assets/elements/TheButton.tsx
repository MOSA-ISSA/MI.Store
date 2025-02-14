import { Pressable, StyleSheet, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components/native';
import { Txt } from './Elements';

const PressableStyled = styled(Pressable) <{ isHovered: boolean; isPressed: boolean; bgcColor: string; isCard?: boolean }>`
    background-color: ${({ isPressed, isHovered, bgcColor, isCard, theme }) =>
        isPressed ? `${bgcColor || theme[isCard ? "card" : "buttonBgc"]}50` : isHovered ? `${bgcColor || theme[isCard ? "card" : "buttonBgc"]}90` : bgcColor || theme[isCard ? "card" : "buttonBgc"]};
`;

interface TheButtonProps {
    buttonStyle?: StyleProp<ViewStyle>;
    onPress: () => void;
    title?: string;
    textStyle?: StyleProp<TextStyle>;
    children?: ReactNode;
    isCard?: boolean;
    bgcColor?: string;
    id?: string;
}

const TheButton: React.FC<TheButtonProps> = React.memo(({
    bgcColor,
    buttonStyle,
    onPress,
    title,
    textStyle,
    isCard,
    children,
    id
}) => {
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
            isCard={isCard}
            bgcColor={bgcColor}
            // style={buttonStyle || styles.button}
            style={{ ...styles.button, ...buttonStyle }}
            id={id}
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
        margin: 5,
        padding: 5,
    }
});
