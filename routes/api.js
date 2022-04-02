const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

require('dotenv').config({ path: '../.env' });

router.get('/:search', async (req, res) => {
  console.log(req.params.search);
  const response = await fetch(
    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.API_KEY}&q=${req.params.search}`
  );
  const data = await response.json();
  res.json(data);
});

router.get('/forcast/:id', async (req, res) => {
  console.log(req.params.id);
  const response = await fetch(
    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${req.params.id}?apikey=${process.env.API_KEY}&metric=true`
  );
  const data = await response.json();
  const newArr = data.DailyForecasts.map((item) => ({
    dateDay: item.Date.slice(8, 10),
    dateMonth: item.Date.slice(5, 7),
    max: item.Temperature.Maximum.Value,
    min: item.Temperature.Minimum.Value,
    unit: item.Temperature.Maximum.Unit,
    day: { icon: item.Day.Icon, phrase: item.Day.IconPhrase },
    night: { icon: item.Night.Icon, phrase: item.Night.IconPhrase },
  }));
  res.json(newArr);
});

module.exports = router;
