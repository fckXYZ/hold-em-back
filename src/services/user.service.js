const bcrypt = require('bcrypt');

const User = require('../models/user.model');

module.exports = {
  createUser: async (username, email, password) => {
    bcrypt
      .hash(password, 10)
      .then((hash) => User.create({ username, email, password: hash }))
      .then((user) => user)
      .catch((error) => error);
  },
};
