const express = require('express');

const router = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

// ( /login )
router.get('/', (req, res) => {
  res.render('login');
});

// route for login action
router.post('/', async (req, res) => {
  if (!req.body) res.redirect('/');
  const user = await User.findOne({
    username: req.body.username,
    password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
  });
  if (!user) res.render('login', { error: 'Invalid Credentials' });
  req.session.username = user.username;
  req.session.role = user.role;
  req.session.uid = user._id;
  res.redirect('/');
});


module.exports = router;
