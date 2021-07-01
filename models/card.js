const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    front: {type: String, required: true},
    back: {type: String, required: true},
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;