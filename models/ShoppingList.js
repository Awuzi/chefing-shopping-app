const mongoose = require('mongoose');

const { Schema } = mongoose;

const ShoppingList = new Schema({
  name: String,
  quantity: { type: Number, default: 0 },
  isDone: Boolean,
  uid: String,
});

module.exports = mongoose.model('ShoppingList', ShoppingList);
