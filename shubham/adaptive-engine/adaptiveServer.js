const express = require("express");

const {
  analyzeStudent,
  processStudentAnswer
} = require("./adaptiveApi");

const app = express();

app.use(express.json());


// ============================================
// ANALYZE STUDENT
// ============================================

app.post("/api/adaptive/analyze", (req, res) => {
  try {
    const assessment = req.body;

    const result = analyzeStudent(assessment);

    res.json(result);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// ============================================
// PROCESS QUIZ ANSWER
// ============================================

app.post("/api/adaptive/answer", (req, res) => {
  try {
    const {
      mastery,
      concept,
      difficulty,
      isCorrect
    } = req.body;

    const result = processStudentAnswer(
      mastery,
      concept,
      difficulty,
      isCorrect
    );

    res.json(result);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});


// ============================================
// SERVER
// ============================================

const PORT = 5001;

app.listen(PORT, () => {
  console.log(
    `ADAPT.AI Adaptive Server running on port ${PORT}`
  );
});