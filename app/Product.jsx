import { ActivityIndicator, Image, StyleSheet, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { getOneProduct } from '../api/product.api'
import { Cover, IconFeather, Txt } from '../assets/elements/Elements'
import ScrollImages from '../components/ScrollImages'
import TheButton from '../assets/elements/TheButton'

const Product = () => {
    const { params } = useRoute()
    const [Loading, setLoading] = useState(true);
    const [Product, setProduct] = useState({});

    const getProductApi = async () => {
        const product = await getOneProduct(params.product_id)
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
        setProduct(product?.data || {});
        console.log("product", product?.data);
    }

    useEffect(() => {
        getProductApi();
    }, [])

    return (
        <Cover>
            <ScrollView style={styles.ScrollView} contentContainerStyle={styles.ScrollViewContainer}>
                {Loading && <ActivityIndicator size={"large"} />}
                <Txt style={styles.title}>{Product?.name}</Txt>
                {/* <Txt>{params.product_id}</Txt> */}
                <ScrollImages maxWidth={800} Height={350} images={Product?.images} />
                <View style={styles.footer}>
                    <Txt style={styles.txt}>₪{Product?.price}</Txt>
                    <TheButton>
                        <Txt style={styles.txt}>order now</Txt>
                    </TheButton>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <TheButton>
                            <IconFeather name="heart" size={24} />
                        </TheButton>
                        <TheButton>
                            <IconFeather name="shopping-cart" size={24} />
                        </TheButton>
                    </View>
                </View>
                <Txt style={styles.txt}>{Product?.description}</Txt>
                <Image
                    source={{ uri: Product?.image }}
                    onError={() => setProduct({ ...Product, image: "https://via.placeholder.com/150" })}
                    style={styles.image}
                    resizeMode='cover'
                />
            </ScrollView>
        </Cover>
    )
}

export default Product

const styles = StyleSheet.create({
    ScrollView: {
        flex: 1,
    },
    ScrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    image: {
        maxWidth: 600,
        maxHeight: 600,
        width: "100%",
        height: 300,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    txt: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        // marginBottom: 10,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        width: '100%',
        paddingHorizontal: 20,
        maxWidth: 600,
        alignItems: 'center',
    }
})
