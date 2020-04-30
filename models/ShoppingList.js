const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoppingList = new Schema({
    name: String,
    quantity: Number,
    isDone: Boolean
});

module.exports = mongoose.model("ShoppingList", ShoppingList);