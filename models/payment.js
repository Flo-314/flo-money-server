const mongoose = require('mongoose');

const { Schema } = mongoose;

const payment = new Schema({
  ammount: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('payment', payment);
