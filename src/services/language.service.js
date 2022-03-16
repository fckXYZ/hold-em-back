const Language = require('../models/language.model');

const config = require('../config/index');

module.exports = {
  getLanguageByLocale: async (locale) => {
    try {
      return await Language.findOne({ locale });
    } catch (e) {
      console.error('Error in languages service', e);
      return e;
    }
  },
  getLanguageByLocaleOrDefault: async (locale) => {
    try {
      let currency = await Language.findOne({ locale });
      if (!currency) {
        currency = await Language.findOne({ locale: config.DEFAULT_LANGUAGE });
      }
      return currency;
    } catch (e) {
      console.error('Error in languages service', e);
      return e;
    }
  },
};
