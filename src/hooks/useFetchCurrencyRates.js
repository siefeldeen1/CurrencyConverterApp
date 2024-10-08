import { useEffect } from 'react';
import axios from 'axios';
import useCurrencyStore from '../store/useCurrencyStore';

const useFetchCurrencyRates = () => {
    const setCurrencies = useCurrencyStore((state) => state.setCurrencies);

    useEffect(() => {
        const fetchCurrencyRates = async () => {
            try {
                const response = await axios.get('https://www.floatrates.com/daily/usd.json');

                const data = Object.values(response.data).map((currency) => ({
                    country: currency.name,
                    currencyName: currency.code,
                    rate: currency.rate,
                    lastUpdated: new Date(currency.date).toLocaleString(),
                }));
                setCurrencies(data);


            } catch (error) {
                console.error('Error fetching currency data:', error);
            }
        };

        fetchCurrencyRates();
        const interval = setInterval(fetchCurrencyRates, 10000); // Fetch every 10 seconds

        return () => clearInterval(interval);
    }, [setCurrencies]);
};

export default useFetchCurrencyRates;
