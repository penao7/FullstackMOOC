import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {

  const [weather, setWeather] = useState('');

  useEffect(() => {
    const api_key = process.env.REACT_APP_NOT_SECRET_CODE
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
      .then(res => {
        setWeather(res.data);
      }).catch(err => console.log(err));
  }, []);

  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="250" height="200" />
      {weather ?
        <div><h3>Weather in {weather.location.name}</h3>
          <p><b>temperature:</b> {weather.current.temperature}</p>
          <img src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png" />
          <p><b>wind:</b> {weather.current.wind_speed} MPH direction: {weather.current.wind_dir}</p>
        </div>
        : ""
      }
    </div>
  )
};

const App = () => {

  const [countries, setCountries] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [err, setErr] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data);
      }).catch(err => setErr('Connection Error, try again later'));
  };

  const filterCountries = (e) => {
    if (e.target.value.length === 0 || !countries) {
      return setFilteredCountries('')
    };

    const filtered = countries.filter(country => country.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <p>find countries</p>
      <input onChange={filterCountries} />
      {
        filteredCountries.length < 1
          ?
          <div>no matches found</div>
          : filteredCountries.length === 1
            ?
            filteredCountries.map(country => (
              <Country key={country.name} country={country} />
            ))
            : filteredCountries.length > 10
              ? <div>Too many matches, specify another filter</div>
              :
              filteredCountries.map(country => (
                <div key={country.name}>
                  {country.name}
                  <button value={country.name} onClick={filterCountries}>show</button>
                </div>
              ))
      }
    </div>
  );
};

export default App;
