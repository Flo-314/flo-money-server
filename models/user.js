const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  income: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
  outcome: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
  projections: { type: Schema.Types.ObjectId, ref: 'category' },
  username: { type: String, required: true },
});

module.exports = mongoose.model('user', userSchema);
