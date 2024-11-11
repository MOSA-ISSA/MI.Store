import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard';
import CategoryCarouselWeb from './CategoryCarouselWeb';
import { getAllCategories } from '../api/category.api';

const CategoryCarousel = () => {
    const [Categories, setCategories] = useState([{ name: 'Loading...', image: 'https://via.placeholder.com/150' }]);

    const getAllCategoryApi = async () => {
        const categories = await getAllCategories()
            .catch((error) => console.log(error))
        // .finally(() => setLoading(false));
        setCategories(categories?.data || []);
        console.log("categories", categories?.data?.length);
    }
    useEffect(() => {
        getAllCategoryApi();
    }, []);

    const renderCategories = () => {
        const categories = Categories || []
        return categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
        ));
    }


    return (
        <View style={styles.container}>
            {Platform.OS === 'web' ? (
                <CategoryCarouselWeb renderCategories={renderCategories} items={Categories} />
            ) : (
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.rowScroll}
                    showsHorizontalScrollIndicator={true}
                    scrollEventThrottle={16}
                >
                    {renderCategories()}
                </ScrollView>
            )}
        </View>
    )
}

export default CategoryCarousel

const styles = StyleSheet.create({
    container: {
        width: "100%",
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 2,
        zIndex:-100,
        // backgroundColor: '#45454520',
    },
    rowScroll: {
        marginHorizontal: 5,
        justifyContent: 'center',
        flexDirection: 'row',
        // flexGrow: 1,
        position: 'relative',
    },
    rowScrollWeb: {
        marginHorizontal: 5,
        justifyContent: 'center',
        // flexDirection: 'row',
        flexGrow: Platform.OS === 'web' ? 1 : 0,
    }
})