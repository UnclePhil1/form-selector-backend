const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sector: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
