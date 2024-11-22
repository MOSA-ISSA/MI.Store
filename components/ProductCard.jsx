import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import TheButton from './../assets/elements/TheButton';
import { Txt } from '../assets/elements/Elements';
import { useNavigation } from 'expo-router';

const size = Dimensions.get('window');

const ProductCard = (props) => {
    const navigation = useNavigation();
    const { name, price, image, } = props
    const [ImageUrl, setImageUrl] = useState(image)
    const [container_width, set_container_width] = useState(size.width * 0.3);

    const handleNavigate = useCallback(() => {
        navigation.navigate("Product", { product_id: props._id })
    }, [])

    useEffect(() => {
        const handleResize = () => {
            set_container_width(Dimensions.get('window').width * 0.3);
        };

        const subscription = Dimensions.addEventListener('change', handleResize);

        return () => subscription?.remove();
    }, []);

    const webSize = Platform.OS === 'web' ? { height: container_width, width: container_width } : {}

    return (
        <TheButton
            isCard={true}
            onPress={handleNavigate}
            buttonStyle={{ ...styles.card, ...webSize }}
        >
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
        margin: 4,
        maxWidth: 300,
        maxHeight: 300,
        width: size.width * 0.3,
        height: Platform.OS === 'web' ? size.width * 0.3 : 180,
        borderRadius: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: "100%",
        marginBottom: 2,
        borderRadius: 8,
    },
    txt: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
    },
});
