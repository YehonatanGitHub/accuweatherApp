import React from 'react';

export const Header = ({ dispatch }) => {
  return (
    <div className='header '>
      <h1 className='header-text'>AccuWeather App</h1>
      <div className='fc'>
        <span className='celsius'>F</span>
        <label className='switch'>
          <input type='checkbox' onClick={() => dispatch()} />
          <span className='slider round'></span>
        </label>
        <span className='fahrenheit'>C</span>
      </div>
    </div>
  );
};
