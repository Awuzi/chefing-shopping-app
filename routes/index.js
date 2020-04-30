const express = require('express');
const router = express.Router();
const Shopping = require('../models/ShoppingList');

//home page
router.get('/', (req, res) => {
    Shopping.find({}, (err, items) => {
        res.render('index', {
            items: items
        });
    });
});


router.post('/', (req, res) => {
    let item = req.body.item;
    // verify if we submit spaces
    if (item.trim().length !== 0)
        Shopping.insertMany({
            name: req.body.item,
            quantity: parseInt(req.body.quantity),
            isDone: false
        });
    res.redirect('/');
});

router.get('/check/:id', (req, res) => {
    Shopping.findOne({_id: req.params.id}, (err, item) => {
        Shopping.updateOne({_id: item._id}, {$set: {isDone: !item.isDone}}, (err, res) => {
            if (err) console.log(err);
            console.log('done !');
        });
        res.redirect('/');
    });
});

router.get('/delete/:id', (req, res) => {
    Shopping.deleteOne({_id: req.params.id}, (err, res) => {
        if (err) console.log(err);
        console.log('deleted !');
    });
    res.redirect('/');
});

module.exports = router;
