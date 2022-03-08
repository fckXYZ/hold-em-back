const mongoose = require('mongoose');
const { LANGUAGES_CONSTANTS } = require('../constants');

const localesInitArray = [];
LANGUAGES_CONSTANTS.map((lang) => localesInitArray.push(lang.locale));

const languageSchema = new mongoose.Schema({
  locale: {
    type: String,
    required: true,
    enum: localesInitArray,
    default: 'en',
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('language', languageSchema);
