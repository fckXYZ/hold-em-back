const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const ConflictError = require('../errors/ConflictError');

const errorMessages = require('../constants/errors');

module.exports = {
  getUserInfoById: async (id) => {
    try {
      return await User.findOne({ _id: id })
        .select('username email main_currency language balance')
        .populate('main_currency', 'name key -_id')
        .populate('language', 'name locale -_id')
        .populate('balance', '-_id');
    } catch (e) {
      console.log(e);
      return e;
    }
  },
  createUser: async (userCreds) => {
    const {
      username,
      email,
      password,
      currency,
      language,
    } = userCreds;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      return await User.create({
        username,
        email,
        password: hashedPassword,
        main_currency: currency,
        language,
      });
    } catch (e) {
      if (e.message.includes('unique')) {
        throw new ConflictError(errorMessages.DUPL_EMAIL);
      }
      return e;
    }
  },
};
