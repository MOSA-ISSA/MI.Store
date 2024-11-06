import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import TheButton from './../assets/elements/TheButton';
import { Txt } from '../assets/elements/Elements';
import { useNavigation } from 'expo-router';

const ProductCard = (props) => {
    const navigation = useNavigation();
    const { name, price, image, } = props
    const [ImageUrl, setImageUrl] = useState(image)

    const handleNavigate = useCallback(() => {
        navigation.navigate("Product", { product_id: props._id })
    }, [])

    return (
        <TheButton onPress={handleNavigate} buttonStyle={styles.card} isCard={true}>
            <Image
                source={{ uri: ImageUrl || "https://via.placeholder.com/150" }}
                onError={() => setImageUrl("https://via.placeholder.com/150")}
                resizeMode='cover'
                style={styles.image}
            />

            <Txt numberOfLines={1} ellipsizeMode="tail" style={styles.txt}>{name || "name"}</Txt>
            <Txt style={styles.txt}>₪{price || "price"}</Txt>
        </TheButton>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        padding: 4,
        maxWidth: 200,
        maxHeight: 200,
        width: "30%",
        margin: 0,
        borderRadius: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: "100%",
        height: 120,
        marginBottom: 10,
        borderRadius: 8,
    },
    txt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
