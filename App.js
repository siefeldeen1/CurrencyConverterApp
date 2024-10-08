import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CurrencyListScreen from './src/screens/CurrencyListScreen';
import CurrencyConverterScreen from './src/screens/CurrencyConverterScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Currency List">
        <Stack.Screen name="Currency List" component={CurrencyListScreen} />
        <Stack.Screen name="Currency Converter" component={CurrencyConverterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
