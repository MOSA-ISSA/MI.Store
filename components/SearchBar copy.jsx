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
        if (dropdownVisible === false) {
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
                {/* <Image source={{ uri: item.image||"https://via.placeholder.com/150" }} style={styles.image} /> */}
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
                        console.log("test");
                        handleSearch('');
                    }}
                    onBlur={() => {
                        if (dropdownVisible) toggleDropdown();
                    }}
                />
            </View>
            {/* <Animated.View
                id={'dropdown'}
                aria-modal={'true'}
                role={'dialog'}
                tabIndex={-1}
                aria-hidden={!dropdownVisible}
                aria-expanded={dropdownVisible}
                aria-labelledby="search-results"
                key={'dropdown'}
                pointerEvents={dropdownVisible ? 'auto' : 'none'}
                style={[styles.dropdown, { height: dropdownHeight }]}

            > */}
            <ScrollView
                style={[styles.dropdown, { height: dropdownHeight }]}
                // style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContainer}
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
            >
                {renderOptions()}
            </ScrollView>
            {/* </Animated.View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        // position: Platform.OS !== 'web' ? 'absolute' : 'relative',
        position: 'relative',
        alignSelf: 'center',
        width: '90%',
        height: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBox: {
        width: '100%',
        maxWidth: 600,
        marginTop: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#45454550',
        borderRadius: 10,
    },
    searchInput: {
        fontSize: 16,
        padding: 10,
    },
    dropdown: {
        width: '100%',
        maxWidth: 500,
        position: 'absolute',
        zIndex: 99,
        top: 60,
        alignSelf: 'center',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00000050',
        borderRadius: 10,
    },
    dropdownItem: {
        padding: 15,
        borderBottomWidth: 5,
        borderBottomColor: '#45454520',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 99,
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
    scrollView: {
        flex: 1,
        flexGrow: 1,
        zIndex: 99,
    },
    scrollViewContainer: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        zIndex: 99,
    },
});
