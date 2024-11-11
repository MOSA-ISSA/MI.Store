import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import TheButton from '../assets/elements/TheButton'
import { ImageBorder, Txt } from '../assets/elements/Elements'
import TheContext from './../hooks/TheContext';



const CategoryCard = (props) => {
    const { selectedCategory, setCategory } = useContext(TheContext)
    const handleCategory = () => {
        return selectedCategory === props.name ? {} : { borderColor: '#ffffff10' }
    }
    const handlePress = () => {
        setCategory((prev) => prev === props.name ? '' : props.name)
    }
    return (
        <TheButton
            buttonStyle={styles.category}
            onPress={() => handlePress()}
            // isCard={true}
        >
            <ImageBorder
                source={{ uri: props?.image || "https://via.placeholder.com/150" }}
                style={{
                    ...styles.image,
                    ...{ ...handleCategory() },
                }}
            />
            <Txt numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{props.name}</Txt>
            {/* <Txt numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{selectedCategory === props._id&&selectedCategory}</Txt> */}
        </TheButton>
    )
}

export default CategoryCard

const styles = StyleSheet.create({
    category: {
        width: 100,
        height: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        // overflow: 'hidden',
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        zIndex: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5,
        position: 'absolute',
        bottom: 20,
    },
})
