const mongoose = require('mongoose');

const dataChange = require('../database/data-change');

const DEFAULT_DIR_PATH = __dirname + '/attack-patterns/';

const DB_IP = '127.0.0.1:27017'; 

const mongoDbUrl = `mongodb://${DB_IP}`;

let _db;

const initDb = callback => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }
  mongoose.connect(mongoDbUrl, {useNewUrlParser: true, 
                                useUnifiedTopology: true})
    .then(client => {
      _db = client;
      dataChange.initData(DEFAULT_DIR_PATH);
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
