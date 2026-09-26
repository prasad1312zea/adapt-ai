const express = require("express");
const Assessment = require("../models/Assessment");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const assessment = await Assessment.create(req.body);
        res.status(201).json(assessment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const assessments = await Assessment.find();
        res.json(assessments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;