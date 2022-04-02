import React, { useEffect, useState, useReducer, useRef } from 'react';
import { Header } from './components/Header';
import { CityList } from './components/CityList';
import { Card } from './components/Card';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const reducer = (state, action) => {
  return { val: !state.val };
};

function App() {
  const [metric, dispatch] = useReducer(reducer, { val: true });
  const [search, setSearch] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [city, setCity] = useState('');
  const [id, setId] = useState('0');
  const [forcast, setForcast] = useState([]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (inputValue.length > 1) {
        console.log('fetching data');
        fetch(`http://localhost:5000/api/${inputValue}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => setSearch(data));
      }
    }, 500);
    return () => {
      console.log('cleaning up');
      clearTimeout(debounce);
    };
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };
  const selectedCityIdHandler = (cityAndId) => {
    setCity(cityAndId.name);
    setId(cityAndId.id);
    setSearch('');
    setInputValue('');
    setForcast('');
  };
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      console.log('get city info');
      fetch(`http://localhost:5000/api/forcast/${id}/${metric.val}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => setForcast(data));
    }
  }, [id, city, metric]);

  return (
    <div className='App'>
      <Header dispatch={dispatch} />
      <div className='search-bar'>
        <input
          type='text'
          name='search'
          placeholder='Search for a city'
          value={inputValue}
          className='search'
          autoComplete='off'
          onChange={handleInputChange}
        />
        {search?.length > 0 && (
          <div className='autocomplete'>
            <CityList items={search} selectedCityId={selectedCityIdHandler} />
          </div>
        )}
      </div>
      {forcast?.length > 0 && (
        <div className='forcast'>
          <h2 className='city-name'>{city}</h2>
          {forcast.map((item, i) => (
            <Card id={i} forcast={item} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
