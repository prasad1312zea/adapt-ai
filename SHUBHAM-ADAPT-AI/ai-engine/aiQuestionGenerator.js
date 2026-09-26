function generateQuestion({ concept, difficulty }) {
  return {
    concept,
    difficulty,
    question: "Which statement correctly describes a tree?",
    options: [
      "A tree contains cycles",
      "A tree is hierarchical and has no cycles",
      "Every tree node must have two children",
      "A tree cannot have a root"
    ],
    correctAnswer: "A tree is hierarchical and has no cycles",
    explanation:
      "A tree is a hierarchical data structure with no cycles."
  };
}

module.exports = {
  generateQuestion
};