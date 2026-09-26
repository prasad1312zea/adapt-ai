const { processAnswer } = require("./adaptiveQuiz");

console.log("\n===== ADAPTIVE QUIZ SIMULATION =====");

let difficulty = "easy";

console.log("\nQuestion 1:");
console.log(processAnswer(difficulty, true));

difficulty = processAnswer(difficulty, true).nextDifficulty;

console.log("\nQuestion 2:");
console.log(processAnswer(difficulty, true));

difficulty = processAnswer(difficulty, true).nextDifficulty;

console.log("\nQuestion 3:");
console.log(processAnswer(difficulty, false));

difficulty = processAnswer(difficulty, false).nextDifficulty;

console.log("\nQuestion 4:");
console.log(processAnswer(difficulty, false));