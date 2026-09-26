function calculateMastery(correctAnswers, totalQuestions) {
  if (totalQuestions === 0) {
    return 0;
  }

  const mastery = (correctAnswers / totalQuestions) * 100;

  return Math.round(mastery);
}

module.exports = {
  calculateMastery
};