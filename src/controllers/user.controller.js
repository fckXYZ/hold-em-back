// const escape = require('escape-html');

const UserService = require('../services/user.service');
const CurrencyService = require('../services/currency.service');
const LanguageService = require('../services/language.service');

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

    try {
      const [userCurrency, userLanguage] = await Promise.all([
        CurrencyService.getCurrencyByKeyOrDefault(currencyKey),
        LanguageService.getLanguageByLocaleOrDefault(languageLocale),
      ]);

      const createdUser = await UserService.createUser({
        username,
        email,
        password,
        currency: userCurrency._id,
        language: userLanguage._id,
      });

      if (!createdUser) {
        return next(new Error('Server error'));
      }
      const userForRes = await UserService.getUserInfoById(createdUser._id);

      return res.status(201)
        .send(userForRes);
    } catch (e) {
      return next(e);
    }
  },
};
