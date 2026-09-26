const { calculateMastery } = require("./masteryEngine");
const { detectKnowledgeGaps } = require("./knowledgeGap");
const { getPrerequisites } = require("./prerequisiteEngine");
const {
  getDifficulty,
  adjustDifficulty
} = require("./difficultyEngine");

const {
  getRecommendedConcept,
  generateLearningPath
} = require("./recommendationEngine");

const {
  updateMastery
} = require("./profileEngine");


function runAdaptiveEngine(assessment) {
  const mastery = {};

  // 1. Calculate mastery
  for (const concept in assessment) {
    const { correct, total } = assessment[concept];

    mastery[concept] = calculateMastery(
      correct,
      total
    );
  }

  // 2. Detect knowledge gaps
  const knowledgeGaps = detectKnowledgeGaps(
    mastery
  );

  // 3. Find recommended concept
  const recommendation = getRecommendedConcept(
    mastery,
    knowledgeGaps,
    getPrerequisites
  );

  const recommendedConcept =
    recommendation.concept;

  // 4. Generate personalized learning path
  const recommendedPath =
    generateLearningPath(
      mastery,
      getPrerequisites
    );

  // 5. Decide question difficulty
  const nextDifficulty =
    recommendedConcept
      ? getDifficulty(
          mastery[recommendedConcept]
        )
      : "medium";

  return {
    mastery,
    knowledgeGaps,
    recommendedConcept,
    recommendedPath,
    nextDifficulty,
    reason: recommendation.reason
  };
}


function processQuizAnswer(
  mastery,
  concept,
  currentDifficulty,
  isCorrect
) {
  // Update student's mastery
  const updatedMastery =
    updateMastery(
      mastery,
      concept,
      isCorrect
    );

  // Adapt next question difficulty
  const nextDifficulty =
    adjustDifficulty(
      currentDifficulty,
      isCorrect
    );

  // Detect new knowledge gaps
  const knowledgeGaps =
    detectKnowledgeGaps(
      updatedMastery
    );

  // Generate new recommendation
  const recommendation =
    getRecommendedConcept(
      updatedMastery,
      knowledgeGaps,
      getPrerequisites
    );

  // Generate updated learning path
  const recommendedPath =
    generateLearningPath(
      updatedMastery,
      getPrerequisites
    );

  return {
    mastery: updatedMastery,
    knowledgeGaps,
    recommendedConcept:
      recommendation.concept,
    recommendedPath,
    nextDifficulty,
    reason: recommendation.reason
  };
}


module.exports = {
  runAdaptiveEngine,
  processQuizAnswer
};