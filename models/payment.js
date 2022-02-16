const mongoose = require('mongoose');

const { Schema } = mongoose;

const payment = new Schema({
  ammount: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  isMonthly: { type: Boolean, required: true },
  isIncome: { type: Boolean, required: false },
});

module.exports = mongoose.model('payment', payment);
