function updateMastery(currentMastery, concept, isCorrect) {
  const currentScore = currentMastery[concept] ?? 0;

  let newScore;

  if (isCorrect) {
    newScore = currentScore + 10;
  } else {
    newScore = currentScore - 10;
  }

  newScore = Math.max(0, Math.min(100, newScore));

  return {
    ...currentMastery,
    [concept]: newScore
  };
}

module.exports = {
  updateMastery
};