const express = require('express');
const bodyParser = require('body-parser');

const items = require('./routes/api');

const app = express();
const cors = require('cors');
require('dotenv').config({ path: '.env' });

// Bodyparser Middleware
app.use(bodyParser.json());

app.use(
  cors({
    origin: '*',
  })
);

// Use Routes
app.use('/api', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
