const mongoose = require('mongoose');

const { Schema } = mongoose;

const projection = new Schema({
  projection: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
});

module.exports = mongoose.model('projection', projection);
