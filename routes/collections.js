const {CardPackage, validatePackage} = require("../models/cardPackage");
const {Card, validateCard} = require("../models/card");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cardPackage = await CardPackage.find();
        return res.send(cardPackage);
    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const cardPackage = await CardPackage.findById(req.params.id);
        
        if(!cardPackage)
            return res.status(400).send(`The card package with id "${req.params.id}" does not exist`);

        return res.send(cardPackage);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.post("/", async (req, res) => {
    try{
        const {error} = validatePackage(req.body);
        if (error)
            return res.status(400).send(error);

        const cardPackage = new CardPackage({
            title: req.body.title,
        })

        await cardPackage.save();

        return res.send(cardPackage);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
})

module.exports = router;