const { updateMastery } = require("./profileEngine");

let mastery = {
  arrays: 90,
  linkedList: 80,
  trees: 40,
  graphs: 20
};

console.log("\n===== CONTINUOUS LEARNING PROFILE =====");

console.log("\nInitial Mastery:");
console.log(mastery);

mastery = updateMastery(mastery, "trees", true);

console.log("\nAfter Correct Answer - Trees:");
console.log(mastery);

mastery = updateMastery(mastery, "graphs", false);

console.log("\nAfter Wrong Answer - Graphs:");
console.log(mastery);