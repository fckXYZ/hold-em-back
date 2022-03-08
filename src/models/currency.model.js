const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  key: {
    type: String,
    required: true,
    minLength: 2,
  },
});

module.exports = mongoose.model('currency', currencySchema);
