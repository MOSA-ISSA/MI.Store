import { ActivityIndicator, FlatList, Platform, StyleSheet, View, } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Cover } from '@elements/Elements';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '../api/product.api';
import CategoryCarousel from '../components/CategoryCarousel';
import TheContext from '../hooks/TheContext';
import SearchBar from '../components/SearchBar';
import { ScrollView } from 'react-native-web';

const Home = () => {
    const { selectedCategory, Search, Products: providerProducts, } = useContext(TheContext);
    const [Loading, setLoading] = useState(providerProducts ? false : true);
    const [Products, setProduct] = useState(providerProducts || []);

    const getAllProductsApi = async () => {
        let body = {};
        if (selectedCategory) {
            body.category = selectedCategory;
        }
        const products = await getAllProducts(body)
            .catch((error) => {
                // getAllProductsApi();
                console.log(error)
            })
            .finally(() => setLoading(false));
        setProduct(products?.data || []);
        console.log("products", products?.data?.length);
    }

    const RenderProductsOnWeb = () => {
        return (
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
            >
                <CategoryCarousel />
                <div className='scroll'>
                    <View style={styles.loadingContainer}>
                        {Loading && <ActivityIndicator size="large" />}
                    </View>
                    {
                        Products.map((product, index) => (
                            <ProductCard {...product} key={index} />
                        ))
                    }
                </div>
            </ScrollView>
        );
    }

    useEffect(() => {
        console.log("selectedCategory", !!selectedCategory);

        if (selectedCategory) {
            getAllProductsApi();
        } else {
            (providerProducts) ? setProduct(providerProducts) : getAllProductsApi();
        }
    }, [selectedCategory]);

    return (
        <Cover>
            {Platform.OS !== 'web' && Search && <SearchBar />}
            {Platform.OS === 'web' ?
                <RenderProductsOnWeb />
                :
                <FlatList
                    data={Products}
                    renderItem={({ item }) => <ProductCard {...item} />}
                    keyExtractor={(item) => item._id}
                    numColumns={3}
                    // HeaderComponent={<CategoryCarousel />}
                    StickyHeaderComponent={true}
                    ListHeaderComponent={<CategoryCarousel />}
                    ListFooterComponent={Loading && <ActivityIndicator size="large" />}
                    columnWrapperStyle={{
                        justifyContent: 'flex-start',
                    }}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                />
            }
        </Cover>
    );
}

export default Home;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        flexGrow: 1,
    },
    scrollViewContainer: {
        flex: 1,
        flexGrow: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    loadingContainer: {
        position: 'absolute',
        top: 150,
        zIndex: 1,
        right: "50%",
        left: '50%',
    }
});
