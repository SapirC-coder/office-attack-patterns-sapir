const mongoose = require('mongoose');

const data_change = require('../database/data-change');

const default_dir_path = __dirname + '/attack-patterns/';

const server_ip = '127.0.0.1'; 
const database_name = 'attack-patterns-db';

const mongoDbUrl = `mongodb://${server_ip}/${database_name}`;

let _db;

const initDb = callback => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      _db = client;
      data_change.init_data(default_dir_path);
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

function getDb () {
  if (!_db) {
    throw Error('Database not initialzed');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
