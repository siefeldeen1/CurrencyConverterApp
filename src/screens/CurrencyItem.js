import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CurrencyItem = ({ currency }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Currency Converter', { currency })} // Corrected navigation to match the screen name
        >
            <Text style={styles.country}>{currency.country}</Text>
            <Text style={styles.currencyName}>{currency.currencyName}</Text>
            <Text style={styles.rate}>Rate: <Text style={styles.rateValue}>{currency.rate}</Text></Text>
            <Text style={styles.lastUpdated}>Last Updated: {currency.lastUpdated}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    country: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    currencyName: {
        fontSize: 16,
        marginTop: 4,
    },
    rate: {
        fontSize: 14,
        marginTop: 2,
        color: 'green',
    },
    rateValue: {
        fontWeight: 'bold',
    },
    lastUpdated: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
});

export default CurrencyItem;
