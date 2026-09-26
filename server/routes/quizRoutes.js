const express = require("express");
const Performance = require("../models/Performance");

const router = express.Router();

router.post("/submit", async (req, res) => {
    try {
        const { userId, subject, concept, isCorrect } = req.body;

        const performance = await Performance.findOne({
            userId,
            subject
        });

        if (!performance) {
            return res.status(404).json({
                error: "Performance data not found"
            });
        }

        const target = performance.concepts.find(
            (c) => c.name === concept
        );

        if (!target) {
            return res.status(404).json({
                error: "Concept not found"
            });
        }

        // Adaptive mastery update
        if (isCorrect) {
            target.mastery = Math.min(100, target.mastery + 15);
        } else {
            target.mastery = Math.max(0, target.mastery - 5);
        }

        if (target.mastery >= 80) {
            target.status = "mastered";
        } else if (target.mastery >= 50) {
            target.status = "learning";
        } else {
            target.status = "weak";
        }

        await performance.save();

        res.json({
            message: "Mastery updated successfully",
            concept: target.name,
            mastery: target.mastery,
            status: target.status
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;