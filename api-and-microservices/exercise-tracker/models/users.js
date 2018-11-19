const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  username: {type: String, unique: true}
});

module.exports = mongoose.model('User', userSchema);
