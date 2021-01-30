import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCountry = (name) => {

  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${name.value}?fullText=true`)
      .then(country => setCountry(country.data[0]))
      .catch(err => setCountry('null'));
  }, [name]);

  return (
    country
  );

};