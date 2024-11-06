import { ActivityIndicator, ScrollView, StyleSheet, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Txt, Cover } from '@elements/Elements';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '../api/product.api';

const Home = () => {
    const [Loading, setLoading] = useState(true);
    const [Products, setProduct] = useState([]);

    const getAllProductsApi = async () => {
        const products = await getAllProducts()
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
        setProduct(products?.data||[]);
        console.log("products", products?.data?.length);
    }

    const renderProducts = () => {
        return Products.map((product, index) => {
            return (
                <ProductCard {...product} key={index} />
            )
        })
    }

    useEffect(() => {
        getAllProductsApi();
    }, [])

    return (
        <Cover>
            {Loading && <ActivityIndicator size={"large"} />}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {renderProducts()}
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
    },
    scrollViewContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    }
})