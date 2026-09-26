const {
  runAdaptiveEngine,
  processQuizAnswer
} = require("./adaptiveEngine");

const assessment = {
  arrays: {
    correct: 9,
    total: 10
  },

  linkedList: {
    correct: 8,
    total: 10
  },

  trees: {
    correct: 4,
    total: 10
  },

  graphs: {
    correct: 2,
    total: 10
  }
};


// ========================================
// INITIAL ASSESSMENT
// ========================================

const result = runAdaptiveEngine(assessment);

console.log("\n========================================");
console.log("        ADAPT.AI INITIAL ANALYSIS");
console.log("========================================");

console.log("\nMastery:");
console.log(result.mastery);

console.log("\nKnowledge Gaps:");
console.log(result.knowledgeGaps);

console.log("\nRecommended Concept:");
console.log(result.recommendedConcept);

console.log("\nPersonalized Learning Path:");
console.log(result.recommendedPath);

console.log("\nNext Difficulty:");
console.log(result.nextDifficulty);

console.log("\nReason:");
console.log(result.reason);


// ========================================
// QUIZ ANSWER 1
// ========================================

console.log("\n========================================");
console.log("        QUIZ ANSWER 1");
console.log("========================================");

const afterAnswer1 = processQuizAnswer(
  result.mastery,
  "trees",
  result.nextDifficulty,
  true
);

console.log("\nStudent answered Trees correctly.");

console.log("\nUpdated Mastery:");
console.log(afterAnswer1.mastery);

console.log("\nNew Knowledge Gaps:");
console.log(afterAnswer1.knowledgeGaps);

console.log("\nNext Recommended Concept:");
console.log(afterAnswer1.recommendedConcept);

console.log("\nNext Difficulty:");
console.log(afterAnswer1.nextDifficulty);

console.log("\nUpdated Learning Path:");
console.log(afterAnswer1.recommendedPath);


// ========================================
// QUIZ ANSWER 2
// ========================================

console.log("\n========================================");
console.log("        QUIZ ANSWER 2");
console.log("========================================");

const afterAnswer2 = processQuizAnswer(
  afterAnswer1.mastery,
  "trees",
  afterAnswer1.nextDifficulty,
  false
);

console.log("\nStudent answered Trees incorrectly.");

console.log("\nUpdated Mastery:");
console.log(afterAnswer2.mastery);

console.log("\nNew Knowledge Gaps:");
console.log(afterAnswer2.knowledgeGaps);

console.log("\nNext Recommended Concept:");
console.log(afterAnswer2.recommendedConcept);

console.log("\nNext Difficulty:");
console.log(afterAnswer2.nextDifficulty);

console.log("\nUpdated Learning Path:");
console.log(afterAnswer2.recommendedPath);


// ========================================
// FINAL SUMMARY
// ========================================

console.log("\n========================================");
console.log("        ADAPT.AI FINAL PROFILE");
console.log("========================================");

console.log("\nFinal Mastery:");
console.log(afterAnswer2.mastery);

console.log("\nFinal Recommendation:");
console.log(afterAnswer2.recommendedConcept);

console.log("\nFinal Learning Path:");
console.log(afterAnswer2.recommendedPath);

console.log("\nFinal Difficulty:");
console.log(afterAnswer2.nextDifficulty);