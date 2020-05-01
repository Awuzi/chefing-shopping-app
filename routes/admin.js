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

router.get('/user/:id', isLogged, async (req, res) => {
  await User.deleteOne({ _id: req.params.id });
  res.redirect('/admin');
});

module.exports = router;
