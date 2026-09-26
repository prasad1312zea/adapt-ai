const express = require("express");
const User = require("../models/User");
const Performance = require("../models/Performance");
const Assessment = require("../models/Assessment");

const router = express.Router();

router.get("/:userId/:subject", async (req, res) => {
    try {
        const { userId, subject } = req.params;

        const user = await User.findById(userId);
        const performance = await Performance.findOne({
            userId,
            subject
        });

        const assessments = await Assessment.find({
            userId,
            subject
        }).sort({ createdAt: -1 });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        const concepts = performance?.concepts || [];

        const weakConcepts = concepts
            .filter(c => c.mastery < 60)
            .sort((a, b) => a.mastery - b.mastery);

        const masteredConcepts = concepts
            .filter(c => c.mastery >= 80);

        res.json({
            student: {
                id: user._id,
                name: user.name,
                branch: user.branch,
                year: user.year,
                semester: user.semester
            },

            subject,

            mastery: concepts,

            weakConcepts,

            masteredConcepts,

            latestAssessment: assessments[0] || null,

            stats: {
                totalConcepts: concepts.length,
                weakCount: weakConcepts.length,
                masteredCount: masteredConcepts.length
            }
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;