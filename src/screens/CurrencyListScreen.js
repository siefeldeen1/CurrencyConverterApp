import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import useCurrencyStore from '../store/useCurrencyStore';
import useFetchCurrencyRates from '../hooks/useFetchCurrencyRates';
import CurrencyItem from './CurrencyItem';
import * as Animatable from 'react-native-animatable';
import { FontAwesome } from '@expo/vector-icons';

const CurrencyListScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc');
    const currencies = useCurrencyStore((state) => state.currencies);

    useFetchCurrencyRates();

    // Filter currencies based on search query (by country or currency name)
    const filteredCurrencies = currencies.filter(currency =>
        currency.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.currencyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort currencies based on conversion rates
    const sortedCurrencies = [...filteredCurrencies].sort((a, b) => {
        const rateA = a.rate; // Adjust property based on your actual data structure
        const rateB = b.rate; // Ensure this matches the structure in your store

        return sortOrder === 'asc' ? rateA - rateB : rateB - rateA;
    });

    const renderCurrencyItem = ({ item }) => (
        <CurrencyItem currency={item} />
    );

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <View style={styles.container}>
            <Animatable.View
                animation="fadeIn"
                duration={500}
                style={styles.searchContainer}
            >
                <TextInput
                    style={[styles.searchInput, { borderColor: isFocused ? '#007BFF' : '#ccc' }]}
                    placeholder="Search by country or currency name"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    selectionColor="#007BFF"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                        <Text style={styles.clearText}>X</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={toggleSortOrder} style={styles.sortButton}>
                    <FontAwesome name={sortOrder === 'asc' ? 'sort-amount-asc' : 'sort-amount-desc'} size={20} color="#007BFF" />
                </TouchableOpacity>
            </Animatable.View>
            <FlatList
                data={sortedCurrencies}
                renderItem={renderCurrencyItem}
                keyExtractor={(item) => item.currencyName}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        height: 50,
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingRight: 40, // Space for the clear button
        fontSize: 16,
        backgroundColor: '#ffffff',
        color: '#000',
        borderColor: '#ccc',
    },
    clearButton: {
        position: 'absolute',
        right: 45, // Adjusted to position it correctly
        top: 12,
        zIndex: 1,
    },
    clearText: {
        fontSize: 18,
        color: 'black',
    },
    sortButton: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        zIndex: 1,
    },
    listContainer: {
        padding: 16,
    },
});

export default CurrencyListScreen;
