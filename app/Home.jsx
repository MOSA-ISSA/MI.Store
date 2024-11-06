import { ScrollView, StyleSheet, } from 'react-native'
import React from 'react'
import { Txt, Cover } from '@elements/Elements';

const Home = () => {

    return (
        <Cover>
            <Txt>Home</Txt>
            <ScrollView contentContainerStyle={styles.scrollView}>

            </ScrollView>
        </Cover>
    )
}

export default Home

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
})