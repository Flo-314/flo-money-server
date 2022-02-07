const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  income: [{ type: Schema.Types.ObjectId, ref: 'income', required: true }],
  outcome: [{ type: Schema.Types.ObjectId, ref: 'outcome', required: true }],

  username: { type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);
