const mongoose = require('mongoose');

const { Schema } = mongoose;

const payment = new Schema({
  ammount: { type: String, required: true },
  toFrom: { type: String, required: true },
  isMonthly: { type: Boolean, required: true },
});

module.exports = mongoose.model('payment', payment);
