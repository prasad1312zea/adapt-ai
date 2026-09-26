const express = require("express");
const Performance = require("../models/Performance");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const performance = await Performance.create(req.body);
        res.status(201).json(performance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const performance = await Performance.find({
            userId: req.params.userId
        });

        res.json(performance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;