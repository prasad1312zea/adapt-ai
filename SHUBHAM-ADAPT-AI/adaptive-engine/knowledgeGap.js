function detectKnowledgeGaps(mastery) {
  const gaps = [];

  for (const concept in mastery) {
    if (mastery[concept] < 50) {
      gaps.push(concept);
    }
  }

  return gaps;
}

module.exports = {
  detectKnowledgeGaps
};