const mongoose = require('mongoose');
const Currency = require('../src/models/currency.model');

const config = require('../src/config/index');

const initCurrencies = require('../src/config/init').currencies;

module.exports.up = (next) => {
  mongoose.connect(config.MONGO_DB_ADDRESS)
    .then(() => {
      Promise.all(initCurrencies.map(async (currency) => {
        await Currency.create({
          name: currency.name,
          key: currency.key,
        })
          .then(() => true)
          .catch((err) => console.error(err));
      })).then(() => next());
    });
};

module.exports.down = (next) => {
  next();
};
