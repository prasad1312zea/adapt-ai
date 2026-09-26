const express = require("express");
const Question = require("../models/Question");
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
            .filter(c => c.mastery < 60)
            .sort((a, b) => a.mastery - b.mastery);

        if (weakConcepts.length === 0) {
            return res.json({
                message: "All concepts are currently mastered!"
            });
        }

        const targetConcept = weakConcepts[0];

        let difficulty = "easy";

        if (targetConcept.mastery >= 75) {
            difficulty = "hard";
        } else if (targetConcept.mastery >= 50) {
            difficulty = "medium";
        }

        const questions = await Question.find({
            subject: req.params.subject,
            topic: targetConcept.name,
            difficulty
        }).limit(5);

        res.json({
            targetConcept: targetConcept.name,
            currentMastery: targetConcept.mastery,
            difficulty,
            questions
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;