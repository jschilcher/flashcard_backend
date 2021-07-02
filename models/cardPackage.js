const mongoose = require("mongoose");
const Joi = require("joi");
const { cardSchema } = require("./card");

const cardPackageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    cards: {type: [cardSchema], default: [] },
});

const CardPackage = mongoose.model("CardPackage", cardPackageSchema);

function validateCardPackage(cardPackage) {
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
    });
    return schema.validate(cardPackage);
}

exports.CardPackage = CardPackage;
exports.validatePackage = validateCardPackage;
exports.cardPackageSchema = cardPackageSchema;
