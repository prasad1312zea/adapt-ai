function getDifficulty(mastery) {
  if (mastery < 40) {
    return "easy";
  }

  if (mastery < 70) {
    return "medium";
  }

  return "hard";
}

function adjustDifficulty(currentDifficulty, isCorrect) {
  if (isCorrect) {
    if (currentDifficulty === "easy") {
      return "medium";
    }

    if (currentDifficulty === "medium") {
      return "hard";
    }

    return "hard";
  }

  if (currentDifficulty === "hard") {
    return "medium";
  }

  if (currentDifficulty === "medium") {
    return "easy";
  }

  return "easy";
}

module.exports = {
  getDifficulty,
  adjustDifficulty
};