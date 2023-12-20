const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true, default: mongoose.Types.ObjectId },
  name: { type: String, required: true },
  sector: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
