import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { Cover, Txt } from '../assets/elements/Elements';
import { searchProducts } from '../api/product.api';
import TheButton from '../assets/elements/TheButton';
import { useTheme } from '../hooks/ThemeContext';
import { useNavigation } from 'expo-router';

const Search = () => {
    const navigation = useNavigation();
    const { isDarkTheme } = useTheme();
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    let debounceTimeout;

    const handleSearch = async (text) => {
        setSearchText(text);
        setLoading(true);

        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(async () => {
            try {
                const response = await searchProducts(text);
                if (response?.data) {
                    const sortedData = Sort(response.data, text);
                    setFilteredData(sortedData || []);
                } else {
                    setFilteredData([]);
                }
            } catch (error) {
                console.error("Error during search:", error);
                alert("Error", "An error occurred while searching. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 200);
    };

    function Sort(data, letter) {
        const sortedData = [...data];
        sortedData.sort((a, b) => {
            const aIndex = a.name.toLowerCase().indexOf(letter.toLowerCase());
            const bIndex = b.name.toLowerCase().indexOf(letter.toLowerCase());
            if (aIndex === bIndex) {
                return a.name.localeCompare(b.name);
            }
            return aIndex - bIndex;
        });
        return sortedData;
    }

    useEffect(() => {
        handleSearch('');
    }, []);

    const renderProducts = () => {

        const handleNavigate = (product) => {
            navigation.navigate("Product", { product_id: product._id })
        }

        return filteredData.map((product, index) => (
            <TheButton
                key={index}
                buttonStyle={{ ...styles.dropdownItem, backgroundColor: isDarkTheme ? '#ffffff25' : '#f0f0f0' }}
                onPress={() => handleNavigate(product)}
            >
                <View style={{ flex: 1 }}>
                    <Txt style={styles.itemText}>{product.name}</Txt>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.txt}>
                        {product.description}
                    </Text>
                </View>
                <Image source={{ uri: "https://raw.githubusercontent.com/MOSA-ISSA/images/refs/heads/master/canvas-48.jpg" }} style={styles.image} />
            </TheButton>
        ));
    };

    return (
        <Cover>
            <TextInput
                style={[styles.searchInput, { color: isDarkTheme ? '#EAE0D5' : '#4A4A4A' }]}
                placeholder="Search for products..."
                value={searchText}
                placeholderTextColor={isDarkTheme ? '#EAE0D5' : '#4A4A4A'}
                onChangeText={handleSearch}
            />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    {renderProducts()}
                </ScrollView>
            )}
        </Cover>
    );
};

export default Search;

const styles = StyleSheet.create({
    searchInput: {
        width: '90%',
        maxWidth: 500,
        alignSelf: 'center',
        backgroundColor: '#ffffff25',
        padding: 10,
        marginVertical: 15,
        borderRadius: 8,
        fontSize: 16,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
    scrollViewContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    dropdownItem: {
        padding: 15,
        borderRadius: 8,
        marginVertical: 2,
        width: '90%',
        maxWidth: 500,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        alignSelf: 'center',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    txt: {
        fontSize: 12,
        color: 'gray',
        marginTop: 4,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
});
