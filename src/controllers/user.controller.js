// const escape = require('escape-html');

const Currency = require('../models/currency.model');
const Language = require('../models/language.model');

const UserService = require('../services/user.service');

// avoiding undefined and special symbols in user's input
// const noSymbols = (input) => (escape(input) === 'undefined' ? '' : escape(input));

module.exports = {
  createUser: async (req, res, next) => {
    const {
      username,
      email,
      password,
      currencyKey,
      languageLocale,
    } = req.body;

    const userCurrency = Currency.findOne({ key: currencyKey })
      .then((currency) => {
        if (!currency) {
          // TODO make const GLOBAL_DEFAULT_CURRENCY
          return Currency.findOne({ key: 'usd' })
            .then((defaultCurrency) => defaultCurrency._id);
        }
        return currency._id;
      });

    const userLanguage = Language.findOne({ locale: languageLocale })
      .then((lang) => {
        if (!lang) {
          // TODO make const GLOBAL_DEFAULT_LANGUAGE
          return Currency.findOne({ locale: 'en' })
            .then((defaultLang) => defaultLang._id);
        }
        return lang._id;
      });

    Promise.all([userCurrency, userLanguage])
      .then(([currencyId, languageId]) => {
        UserService.createUser({
          username,
          email,
          password,
          currency: currencyId,
          language: languageId,
        });
      })
      .catch((error) => next(error));
  },
};
