const {CardPackage, validatePackage} = require("../models/cardPackage");
const {Card, validateCard} = require("../models/card");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        const {error} = validateCard(req.body);
        if (error)
            return res.status(400).send(error);

        const card = new Card({
            front: req.body.front,
            back: req.body.back,
        })

        await card.save();

        return res.send(card);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
})

module.exports = router;