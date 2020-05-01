const express = require('express');

const router = express.Router();
const User = require('../models/User');
const isLogged = require('../middleware/auth');

// admin
router.get('/', isLogged, async (req, res) => {
  if (req.session.role !== 'admin') res.redirect('/');
  const users = await User.find({}).exec();
  res.render('admin', {
    users,
    user: req.session,
  });
});

module.exports = router;
