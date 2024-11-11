import { ActivityIndicator, Platform, ScrollView, StyleSheet, View, } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Cover } from '@elements/Elements';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '../api/product.api';
import CategoryCarousel from '../components/CategoryCarousel';
import TheContext from '../hooks/TheContext';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const { selectedCategory, Search, } = useContext(TheContext);
    const [Loading, setLoading] = useState(true);
    const [Products, setProduct] = useState([]);

    const getAllProductsApi = async () => {
        let body = {};
        if (selectedCategory) {
            body.category = selectedCategory;
        }
        const products = await getAllProducts(body)
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
        setProduct(products?.data || []);
        console.log("products", products?.data?.length);
    }

    const renderProducts = () => {
        return Products.map((product, index) => (
            <ProductCard {...product} key={index} />
        ));
    }

    useEffect(() => {
        getAllProductsApi();
    }, [selectedCategory]);

    return (
        <Cover>
            {Platform.OS !== 'web' && Search && <SearchBar />}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
                >
                <CategoryCarousel />
                <View style={styles.loadingContainer}>
                    {Loading && <ActivityIndicator size="large" />}
                </View>
                {renderProducts()}
                {renderProducts()}
            </ScrollView>
        </Cover>
    );
}

export default Home;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 1,
    },
    scrollViewContainer: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    loadingContainer: {
        position: 'absolute',
        top: 150,
        zIndex: 1,
    }
});
