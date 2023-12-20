const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Your existing POST route
router.post(
  '/save-user',
  [
    body('name').trim().notEmpty().escape(),
    body('sector').trim().notEmpty().escape(),
    body('agreeToTerms').isBoolean(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Assuming 'name' is unique, checking if the user with the same name already exists
      const existingUser = await User.findOne({ name: req.body.name });

      if (existingUser) {
        // If the user already exists, return an error
        return res.status(400).json({ error: 'User with the same name already exists' });
      }

      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.json({ success: true, user: savedUser });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// New GET route to fetch all users
router.get('/get-user', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
