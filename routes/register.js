const express = require('express');

const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

// route to register page
router.get('/', (req, res) => {
  res.render('register');
});

// route for register action
router.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    User.insertMany(new User({
      username: req.body.username,
      password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
      role: 'member',
    }), (err, user) => {
      if (err) res.render('register', { user });
      res.redirect('/');
    });
  }
  res.render('register', {
    error: `Username <b>${user.username}</b> already exists !`,
  });
});


module.exports = router;
