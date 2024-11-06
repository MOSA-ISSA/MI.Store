import React, { useState } from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
import Collapsible from 'react-native-collapsible';
import TheButton from './TheButton';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../../hooks/ThemeContext';
import { useNavigation } from 'expo-router';

interface ExpandableButtonProps {
    title?: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    collapsed?: boolean;
    children?: React.ReactNode;
    titleReactElement?: () => React.ReactNode;
}

const ExpandableButton: React.FC<ExpandableButtonProps> = ({
    title,
    onPress,
    buttonStyle,
    textStyle,
    collapsed = true,
    children,
    titleReactElement,
}) => {
    const { colorTextElement, bgcColor } = useTheme();
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const toggleExpanded = () => {
        setIsCollapsed(false);
        onPress?.();
    };

    return (
        <Pressable disabled={true} style={{ ...styles.container, backgroundColor: bgcColor }}>
            <TheButton
                buttonStyle={{ ...styles.button, ...buttonStyle }}
                onPress={toggleExpanded}
            >
                {titleReactElement?.()}
                <Text style={{ color: colorTextElement, ...styles.buttonText, ...textStyle }}>
                    {title || "button"}
                </Text>
                <TheButton 
                buttonStyle={styles.expand} onPress={()=>setIsCollapsed(!isCollapsed)}>
                    <AntDesign
                        name={isCollapsed ? "downcircleo" : "upcircleo"}
                        size={24}
                        color={colorTextElement}
                    />
                </TheButton>
            </TheButton>
            <Collapsible style={styles.collapsible} collapsed={isCollapsed}>
                {children ?? (
                    <Text style={{ color: colorTextElement }}>add options</Text>
                )}
            </Collapsible>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 2,
        borderRadius: 10,
    },
    collapsible: {
        marginLeft: 20,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        // paddingHorizontal: 10,
        padding: 10,
        margin: 0
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    expand:{
        margin:0,
        padding:0
    }
});

export default ExpandableButton;
