const express = require("express");
const cors = require('cors')

const app = express();

const database = require("./database/db");

const PORT = 3001;

app.use(express.json());

const data_handler = require('./data-handler');

app.use(cors());

app.use('/', data_handler);

// initial for database and listening
database.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}.`); });
    }
});
