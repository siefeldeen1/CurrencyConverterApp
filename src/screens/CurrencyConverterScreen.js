import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CurrencyConverterScreen = ({ route }) => {
    const { currency } = route.params; // Get the currency passed from the previous screen
    const [usdAmount, setUsdAmount] = useState(''); // Amount in USD
    const [convertedAmount, setConvertedAmount] = useState(''); // Converted amount in the target currency
    const conversionRate = currency.rate; // Use the passed currency rate

    // Convert currency only when the button is clicked
    const handleConvert = () => {
        if (usdAmount) {
            const convertedValue = parseFloat(usdAmount) * conversionRate;
            setConvertedAmount(convertedValue.toFixed(2)); // Set the converted amount
        } else {
            setConvertedAmount(''); // Reset if input is empty
        }
    };

    // Handle input for converted amount and update the USD amount based on the conversion rate
    const handleConvertedAmountInput = (amount) => {
        setConvertedAmount(amount);
        if (amount) {
            const usdValue = parseFloat(amount) / conversionRate; // Calculate USD based on the conversion rate
            setUsdAmount(usdValue.toFixed(2)); // Update USD amount
        } else {
            setUsdAmount(''); // Reset if input is empty
        }
    };

    return (
        <View style={styles.container}>
            {/* From Currency Input (USD) */}
            <Text style={styles.label}>From USD</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={usdAmount}
                onChangeText={setUsdAmount}
                placeholder="Enter amount in USD"
            />

            {/* To Currency Input (Target Currency) */}
            <Text style={styles.label}>To {currency.currencyName} ({currency.country})</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={convertedAmount}
                onChangeText={handleConvertedAmountInput} // Handle input for converted amount
                placeholder={`Enter amount in ${currency.currencyName}`}
            />

            {/* Convert Button */}
            <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
                <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    convertButton: {
        height: 50,
        backgroundColor: '#007BFF', // Button color
        borderRadius: 7, // Set border radius to 7 pixels
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    buttonText: {
        color: '#fff', // Button text color
        fontSize: 18,
    },
});

export default CurrencyConverterScreen;
