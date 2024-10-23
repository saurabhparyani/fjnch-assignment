import axios from 'axios';

interface Country {
  name: {
    common: string;
  };
  cca2: string;
}

export const fetchCountries = async () => {
  try {
    const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
    return response.data.map((country: Country) => ({
      name: country.name.common,
      code: country.cca2
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};