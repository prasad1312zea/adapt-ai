const { generateExplanation } = require("./aiTutor");

async function testAI() {
  console.log("\n========================================");
  console.log("        ADAPT.AI AI TUTOR TEST");
  console.log("========================================");

  // This data comes from our Adaptive Engine
  const adaptiveResult = {
    mastery: {
      arrays: 90,
      linkedList: 80,
      trees: 40,
      graphs: 20
    },

    knowledgeGaps: [
      "trees",
      "graphs"
    ],

    recommendedConcept: "trees",

    recommendedPath: [
      "trees",
      "graphs"
    ],

    nextDifficulty: "medium",

    reason:
      "trees is a prerequisite for graphs and also needs improvement."
  };

  console.log("\nAdaptive Engine Result:");
  console.log(adaptiveResult);

  console.log("\n----------------------------------------");
  console.log("        AI PERSONALIZED EXPLANATION");
  console.log("----------------------------------------");

  const concept =
    adaptiveResult.recommendedConcept;

  const mastery =
    adaptiveResult.mastery[concept];

  const explanation =
    await generateExplanation({
      concept,
      mastery,
      level: "beginner",
      difficulty:
        adaptiveResult.nextDifficulty,
      knowledgeGaps:
        adaptiveResult.knowledgeGaps,
      reason:
        adaptiveResult.reason
    });

  console.log("\nAI Tutor Response:\n");
  console.log(explanation);
}

testAI();