import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Screen } from '@elements/Elements';
import { Stack } from 'expo-router';
import HeaderApp from '../assets/elements/HeaderApp';

const StackRout = () => {
    return (
        <Screen>
            <Stack
                screenOptions={{
                    header: (props) => <HeaderApp {...props} />
                }}>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="Home" options={{ headerShown: 1,title:"MI.store" }} />
                <Stack.Screen name="Cart" />
                <Stack.Screen name="User" />
                {/* <Stack.Screen name="code-zone" options={{ headerShown: false }} />
                <Stack.Screen name="all-students" />
                <Stack.Screen name="TaskScreen" />
                <Stack.Screen name="uploadTask" />
                <Stack.Screen name="+not-found" /> */}
            </Stack>
        </Screen>
    )
}

export default StackRout

const styles = StyleSheet.create({})