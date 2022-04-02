import React from 'react';

export const City = ({ item, onSelectCity }) => {
  let cityAndId = { name: item.LocalizedName, id: item.Key };
  let selectCityHandler = (itemID) => {
    console.log('clicked');
    onSelectCity(itemID);
  };

  return (
    <div
      key={item.Key}
      id={item.Key}
      className={'autocompleteItems'}
      onClick={() => selectCityHandler(cityAndId)}>
      <span>{`${item.LocalizedName}, ${item.AdministrativeArea.LocalizedName}, ${item.Country.LocalizedName}`}</span>
    </div>
  );
};
