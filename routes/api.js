// The Routes file with including Posting Users to the database.
/////////////////////////////////////////////////////////////////////
// Importing all required dependencies.
const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
////////////////////////////////////////////////////////////////////

const router = express.Router();

//////////////////////////////////////////////////////////////////
// Posting the User or Users
router.post(
  '/save-user',
  [
    body('name').trim().notEmpty().escape(),
    body('sector').trim().notEmpty().escape(),
    body('agreeToTerms').isBoolean(),
  ],

///////////////////////////////////////////////////////////////////
// A async Function to check and validate the user.
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);
///////////////////////////////////////////////////////////////////
module.exports = router;
