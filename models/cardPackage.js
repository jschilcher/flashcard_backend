const mongoose = require("mongoose");

const cardPackageSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
});

const CardPackage = mongoose.model("CardPackage", cardPackageSchema);

module.exports = CardPackage;