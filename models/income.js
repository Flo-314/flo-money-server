const mongoose = require('mongoose');

const { Schema } = mongoose;

const income = new Schema({
  incomes: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
});

module.exports = mongoose.model('income', income);
