const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  currency: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'currency',
  },
  value: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model('rate_to_usd', rateSchema);
