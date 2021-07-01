const mongoose = require("mongoose");
const Joi = require("joi");

const cardPackageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
});

const CardPackage = mongoose.model("CardPackage", cardPackageSchema);

function validateCardPackage(cardPackage) {
    const schema = Joi.object({
        title: Joi.string().min(2).required(),
        description: Joi.string().min(5).required(),
    });
    return schema.validate(cardPackage);
}

exports.CardPackage = CardPackage;
exports.validatePackage = validateCardPackage;
exports.cardPackageSchema = cardPackageSchema;
