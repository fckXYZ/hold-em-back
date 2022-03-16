const Currency = require('../models/currency.model');

const config = require('../config/index');

module.exports = {
  getCurrencyByKey: async (key) => {
    try {
      return await Currency.findOne({ key });
    } catch (e) {
      console.error('Error in currencies service', e);
      return e;
    }
  },
  getCurrencyByKeyOrDefault: async (key) => {
    try {
      let currency = await Currency.findOne({ key });
      if (!currency) {
        currency = await Currency.findOne({ key: config.DEFAULT_CURRENCY });
      }
      return currency;
    } catch (e) {
      console.error('Error in currencies service', e);
      return e;
    }
  },
};
