const express = require('express');

const router = express.Router();
const Shopping = require('../models/ShoppingList');
const isAuthenticated = require('../middleware/auth');

// home page - isAuthenticated middleware
router.get('/', isAuthenticated, async (req, res) => {
  res.render('index', {
    items: await Shopping.find({ uid: req.session.uid }).exec(),
    user: req.session,
  });
});


router.post('/', (req, res) => {
  const { item } = req.body;
  // verify if we submit spaces
  if (item.trim().length !== 0) {
    Shopping.insertMany({
      name: req.body.item,
      quantity: req.body.quantity ? parseInt(req.body.quantity) : 0,
      uid: req.session.uid,
    });
  }
  res.redirect('/');
});

router.get('/check/:id', (req, res) => {
  Shopping.findOne({ _id: req.params.id }, (err, item) => {
    Shopping.updateOne({ _id: item._id }, { $set: { isDone: !item.isDone } }, (err, res) => {
      if (err) console.log(err);
      console.log('checked !');
    });
    res.redirect('/');
  });
});

router.get('/delete/:id', async (req, res) => {
  await Shopping.deleteOne({ _id: req.params.id });
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
  }
});

module.exports = router;
