const { calculateMastery } = require("./masteryEngine");

console.log("Student 1:", calculateMastery(8, 10) + "%");
console.log("Student 2:", calculateMastery(5, 10) + "%");
console.log("Student 3:", calculateMastery(2, 10) + "%");