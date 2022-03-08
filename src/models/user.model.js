/* eslint-disable func-names */
const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not an email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 6,
    maxLength: 30,
  },
  main_currency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'currency',
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'language',
  },
  balance: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'balance',
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return false;
      }

      return bcrypt.compare(password, user.password)
        .then((match) => {
          if (!match) {
            return false;
          }

          return user;
        });
    });
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);
