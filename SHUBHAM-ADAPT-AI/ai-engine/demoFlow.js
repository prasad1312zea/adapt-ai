const {
  runAdaptiveEngine,
  processQuizAnswer
} = require("../adaptive-engine/adaptiveEngine");

const {
  generateExplanation
} = require("./aiTutor");

const {
  generateQuestion
} = require("./aiQuestionGenerator");


async function runDemo() {

  console.log("\n");
  console.log("==============================================");
  console.log("              ADAPT.AI DEMO");
  console.log("==============================================");


  // ============================================
  // STEP 1: DIAGNOSTIC ASSESSMENT
  // ============================================

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


  console.log("\n==============================================");
  console.log("        1. DIAGNOSTIC ASSESSMENT");
  console.log("==============================================");

  console.log(assessment);


  // ============================================
  // STEP 2: KNOWLEDGE ANALYSIS
  // ============================================

  const analysis =
    runAdaptiveEngine(assessment);


  console.log("\n==============================================");
  console.log("        2. KNOWLEDGE ANALYSIS");
  console.log("==============================================");

  console.log("\nMastery:");
  console.log(analysis.mastery);

  console.log("\nKnowledge Gaps:");
  console.log(analysis.knowledgeGaps);

  console.log("\nRecommended Concept:");
  console.log(analysis.recommendedConcept);

  console.log("\nLearning Path:");
  console.log(analysis.recommendedPath);

  console.log("\nNext Difficulty:");
  console.log(analysis.nextDifficulty);

  console.log("\nReason:");
  console.log(analysis.reason);


  // ============================================
  // STEP 3: AI PERSONALIZED LEARNING
  // ============================================

  const concept =
    analysis.recommendedConcept;

  const mastery =
    analysis.mastery[concept];


  console.log("\n==============================================");
  console.log("        3. AI PERSONALIZED LEARNING");
  console.log("==============================================");

  console.log(
    `\nTeaching concept: ${concept}`
  );

  console.log(
    `Student mastery: ${mastery}%`
  );


  const explanation =
    await generateExplanation({
      concept,
      mastery,
      level: "beginner",
      difficulty: analysis.nextDifficulty,
      knowledgeGaps: analysis.knowledgeGaps,
      reason: analysis.reason
    });


  console.log("\nAI TUTOR RESPONSE:\n");
  console.log(explanation);


  // ============================================
  // STEP 4: ADAPTIVE QUIZ
  // ============================================

  console.log("\n==============================================");
  console.log("        4. ADAPTIVE QUIZ");
  console.log("==============================================");


  const question =
    generateQuestion({
      concept,
      difficulty: analysis.nextDifficulty
    });


  console.log("\nQuestion:");
  console.log(question.question);

  console.log("\nOptions:");

  question.options.forEach(
    (option, index) => {
      console.log(
        `${index + 1}. ${option}`
      );
    }
  );


  // ============================================
  // STEP 5: SIMULATE STUDENT ANSWER
  // ============================================

  const studentAnswer =
    question.correctAnswer;

  const isCorrect =
    studentAnswer === question.correctAnswer;


  console.log("\nStudent Answer:");
  console.log(studentAnswer);

  console.log(
    "\nAnswer Result:",
    isCorrect ? "CORRECT" : "INCORRECT"
  );


  // ============================================
  // STEP 6: UPDATE PROFILE
  // ============================================

  const updated =
    processQuizAnswer(
      analysis.mastery,
      concept,
      analysis.nextDifficulty,
      isCorrect
    );


  console.log("\n==============================================");
  console.log("        5. UPDATED LEARNING PROFILE");
  console.log("==============================================");

  console.log("\nUpdated Mastery:");
  console.log(updated.mastery);

  console.log("\nNew Knowledge Gaps:");
  console.log(updated.knowledgeGaps);

  console.log("\nNew Recommendation:");
  console.log(updated.recommendedConcept);

  console.log("\nUpdated Learning Path:");
  console.log(updated.recommendedPath);

  console.log("\nNext Difficulty:");
  console.log(updated.nextDifficulty);

  console.log("\nReason:");
  console.log(updated.reason);


  // ============================================
  // FINAL RESULT
  // ============================================

  console.log("\n==============================================");
  console.log("        ADAPT.AI CYCLE COMPLETE");
  console.log("==============================================");

  console.log("\nAssessment");
  console.log("     ↓");

  console.log("Knowledge Analysis");
  console.log("     ↓");

  console.log("AI Personalized Learning");
  console.log("     ↓");

  console.log("Adaptive Quiz");
  console.log("     ↓");

  console.log("Updated Profile");
  console.log("     ↓");

  console.log("New Recommendation");

  console.log("\n==============================================");
}


runDemo();