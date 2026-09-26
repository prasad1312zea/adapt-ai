const { generateQuestion } = require("./aiQuestionGenerator");

console.log("\n========================================");
console.log("     ADAPT.AI QUESTION GENERATOR TEST");
console.log("========================================");

const question = generateQuestion({
  concept: "trees",
  difficulty: "medium"
});

console.log("\nGenerated Question:\n");

console.log(JSON.stringify(question, null, 2));

console.log("\n========================================");
console.log("        QUESTION GENERATION SUCCESS");
console.log("========================================");