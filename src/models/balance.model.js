const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
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
  due_date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('balance', balanceSchema);
