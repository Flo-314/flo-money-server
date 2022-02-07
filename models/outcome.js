const mongoose = require('mongoose');

const { Schema } = mongoose;

const outcome = new Schema({
  outcomes: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
});

module.exports = mongoose.model('outcome', outcome);
