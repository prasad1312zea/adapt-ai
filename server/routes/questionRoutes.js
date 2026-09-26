const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// GET all questions or filter by query (e.g. ?subject=Data Structures&difficulty=easy)
router.get("/", async (req, res) => {
  try {
    const { subject, topic, difficulty } = req.query;
    const filter = {};

    if (subject) filter.subject = subject;
    if (topic) filter.topic = topic;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await Question.find(filter);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET diagnostic test: returns 1 baseline easy/medium question per topic
router.get("/diagnostic", async (req, res) => {
  try {
    const { subject = "Data Structures" } = req.query;

    const topics = await Question.distinct("topic", { subject });

    const diagnosticQuestions = [];
    for (const topic of topics) {
      // Pick 1 representative question per topic
      const question = await Question.findOne({ subject, topic, difficulty: "easy" }) 
        || await Question.findOne({ subject, topic });

      if (question) {
        diagnosticQuestions.push(question);
      }
    }

    res.json(diagnosticQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a single question (manual add)
router.post("/", async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;