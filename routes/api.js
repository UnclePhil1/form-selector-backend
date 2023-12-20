// routes/api.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// POST route for saving or updating a user
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

      // Check if the user already exists
      const existingUser = await User.findOne({ name: req.body.name });

      if (existingUser) {
        // Update the existing user
        existingUser.sector = req.body.sector;
        existingUser.agreeToTerms = req.body.agreeToTerms;
        const updatedUser = await existingUser.save();
        return res.json({ success: true, user: updatedUser });
      }

      // Create a new user
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.json({ success: true, user: savedUser });
    } catch (error) {
      console.error('Error saving or updating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// GET route to fetch all users
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
