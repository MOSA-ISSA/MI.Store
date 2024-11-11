import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated, StyleSheet, ScrollView, Dimensions, Image, Platform } from 'react-native';
import { searchProducts } from '../api/product.api';
const { height, width } = Dimensions.get('window');

export default function SearchBar() {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownHeight = useRef(new Animated.Value(0)).current;

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
        Animated.timing(dropdownHeight, {
            toValue: dropdownVisible ? 0 : height * 0.4,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleSearch = async (text) => {
        setSearchText(text);
        const response = await searchProducts(text).catch((error) => console.log(error));
        setFilteredData(response?.data || []);
        if (!dropdownVisible) {
            toggleDropdown();
        }
    };

    const handleSelect = (item) => {
        setSearchText(item.name);
        toggleDropdown();
    };

    const renderOptions = () => {
        return filteredData.map((item, index) => (
            <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.itemText}>{item.name}</Text>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.txt}>{item.description}</Text>
                </View>
                <Image source={{ uri: item.image || "https://via.placeholder.com/150" }} style={styles.image} />
                <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.image} />
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    value={searchText}
                    onChangeText={handleSearch}
                    onFocus={() => {
                        if (!dropdownVisible) toggleDropdown();
                        handleSearch('');
                    }}
                    onBlur={() => {
                        if (dropdownVisible) toggleDropdown();
                    }}
                />
            </View>
            <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={true}>
                    {renderOptions()}
                </ScrollView>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        position: 'relative',
        alignSelf: 'center',
        width: '90%',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    searchBox: {
        width: '100%',
        maxWidth: 600,
        marginTop: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#45454550',
    },
    searchInput: {
        fontSize: 14,
        padding: 5,
    },
    dropdown: {
        width: '100%',
        maxWidth: 500,
        position: 'absolute',
        zIndex: 99,
        top: 60,
        alignSelf: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00000050',
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#45454520',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
    },
    txt: {
        fontSize: 12,
        color: 'gray',
    },
    image: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    scrollViewContainer: {
        paddingVertical: 10,
    },
});
