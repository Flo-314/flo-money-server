const mongoose = require('mongoose');

const { Schema } = mongoose;

const category = new Schema({
  name: { type: String, required: true },
  payments: [{ type: Schema.Types.ObjectId, ref: 'payment', required: true }],
  color: { type: String, required: true },
  isMonthly: { type: Boolean, required: true },
});

module.exports = mongoose.model('category', category);
