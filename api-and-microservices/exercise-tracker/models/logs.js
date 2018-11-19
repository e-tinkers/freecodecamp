const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
  userId: {type: String, required: true},
  description: {type: String, required: true},
  duration: {type: Number, required: true},
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Log', logSchema);
