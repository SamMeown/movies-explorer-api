const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { createUser } = require('./controllers/users');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/filmexpdb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());

app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`); // eslint-disable-line no-console
});
