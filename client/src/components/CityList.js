import React from 'react';
import { City } from './City';

export const CityList = (props) => {
  const citySelectHandler = (selectedCityKey) => {
    console.log(selectedCityKey);
    props.selectedCityId(selectedCityKey);
  };

  return (
    <>
      {props.items?.map((item, i) => (
        <City item={item} key={i} onSelectCity={citySelectHandler} />
      ))}
    </>
  );
};
