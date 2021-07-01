const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = new mongoose.Schema({
    front: {type: String, required: true},
    back: {type: String, required: true},
});

const Card = mongoose.model("Card", cardSchema);

function validateCard(card) {
    const schema = Joi.object({
        front: Joi.String().min(5).required(),
        back: Joi.String().min(1).required(),
    })
    return schema.validate(card);
}

exports.Card = Card;
exports.validateCard = validateCard;
exports.cardSchema = cardSchema;