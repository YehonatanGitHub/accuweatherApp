import React from 'react';

export const Card = ({ forcast, id }) => {
  return (
    <div className={`forcast-card${id} forcast-cards`}>
      <div className='date'>{`${forcast.dateDay}/${forcast.dateMonth}`}</div>
      <div className='temp'>{`${forcast.max}° - ${forcast.min}°  ${forcast.unit}`} </div>
      <div className='phrase'>{forcast.day.phrase}</div>
    </div>
  );
};
