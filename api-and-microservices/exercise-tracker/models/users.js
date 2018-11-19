const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: {type: String, default: shortid.generate},
  username: {type: String, unique: true}
});

module.exports = mongoose.model('User', userSchema);
