const express = require("express");
const Performance = require("../models/Performance");

const router = express.Router();

router.get("/:userId/:subject", async (req, res) => {
    try {
        const performance = await Performance.findOne({
            userId: req.params.userId,
            subject: req.params.subject
        });

        if (!performance) {
            return res.status(404).json({
                error: "Performance data not found"
            });
        }

        const weakConcepts = performance.concepts
            .filter(concept => concept.mastery < 60)
            .sort((a, b) => a.mastery - b.mastery);

        const learningPath = weakConcepts.map((concept, index) => ({
            order: index + 1,
            concept: concept.name,
            mastery: concept.mastery,
            status: "recommended"
        }));

        res.json({
            userId: req.params.userId,
            subject: req.params.subject,
            learningPath
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;