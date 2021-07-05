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

router.get("/:cardPackageId/cards", async (req, res) => {
    try {
        const cardPackage = await CardPackage.findById(req.params.cardPackageId);
        if (!cardPackage) 
            return res.status(400).send(`The cardpackage with id "${req.params.cardPackageId}" does not exist.`);

        return res.send(cardPackage);

    }   catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});

router.get("/:cardPackageId/cards/:cardId", async (req, res) => {
    try {
        const cardPackage = await CardPackage.findById(req.params.cardPackageId);
        if (!cardPackage) 
            return res.status(400).send(`The cardpackage with id "${req.params.cardPackageId}" does not exist.`);
           
        const card = await Card.findById(req.params.cardId);
        if (!card)
            return res.status(400).send(`The card with id "${req.params.cardId}`);
        
        return res.send(card);

    } catch (ex) {
        return res.status(500).send(`Internal Server error: ${ex}`);
    }
});

router.post("/:cardPackageId/cards/:cardId", async (req, res) => {
    try {
        const cardPackage = await CardPackage.findById(req.params.cardPackageId);
        if(!cardPackage) return res.status(400).send(`The product with id "${req.params.cardPackageId}" does not exist.`);

        const card = await Card.findById(req.params.cardId);
        if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);

        cardPackage.cards.push(card);

        await cardPackage.save();
        return res.send(cardPackage.cards);
    } catch (ex) {
        return res.status(500).send(`Internal server error: ${ex}`);
    }
});


router.delete("/:cardPackageId/cards/:cardId", async (req, res) => {
    try {
        const cardPackage = await CardPackage.findById(req.params.cardPackageId);
        if(!cardPackage) return res.status(400).send(`The product with id "${req.params.cardPackageId}" does not exist.`);

        let card = cardPackage.cards.id(req.params.cardId);
        if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);

        card = await card.remove();

        await cardPackage.save();
        return res.send(card);

    } catch (ex) {
        return res.status(500).send(`Internal server error ${ex}`);
    }   
}); 

module.exports = router;