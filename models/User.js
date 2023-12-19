// mongodb+srv://formselector:formselector@cluster0.sppjuni.mongodb.net/test
// Models for User's name and choosen selectors.
const mongoose = require('mongoose'); 

// Declearing each users scheme(name, selector, and terms of conditions)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sector: { type: String, required: true },
  agreeToTerms: { type: Boolean, required: true },
});

// Declearing or assigning the scheme to "User"
const User = mongoose.model('User', userSchema);

// Export the User Scheme.
module.exports = User;
