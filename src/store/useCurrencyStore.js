import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCurrencyStore = create(
    persist(
        (set) => ({
            currencies: [],
            setCurrencies: (newCurrencies) => set({ currencies: newCurrencies }),
        }),
        {
            name: 'currency-storage', // Unique name for the storage
            storage: createJSONStorage(() => AsyncStorage), // Use createJSONStorage for AsyncStorage
        }
    )
);

export default useCurrencyStore;
