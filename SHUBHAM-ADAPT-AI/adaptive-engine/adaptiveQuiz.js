const { adjustDifficulty } = require("./difficultyEngine");

function processAnswer(currentDifficulty, isCorrect) {
  const nextDifficulty = adjustDifficulty(
    currentDifficulty,
    isCorrect
  );

  return {
    currentDifficulty,
    isCorrect,
    nextDifficulty
  };
}

module.exports = {
  processAnswer
};