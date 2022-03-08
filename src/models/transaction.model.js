const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'income',
      'spending',
    ],
    required: true,
  },
  currency: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'currency',
  },
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
  balance: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'balance',
  },
});

module.exports = mongoose.model('transaction', transactionSchema);
