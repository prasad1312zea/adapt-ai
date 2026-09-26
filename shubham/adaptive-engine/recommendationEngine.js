function getRecommendedConcept(mastery, knowledgeGaps, getPrerequisites) {
  if (knowledgeGaps.length === 0) {
    return {
      concept: null,
      reason: "No major knowledge gaps detected."
    };
  }

  for (const concept of knowledgeGaps) {
    const prerequisites = getPrerequisites(concept);

    for (const prerequisite of prerequisites) {
      if (knowledgeGaps.includes(prerequisite)) {
        return {
          concept: prerequisite,
          reason: `${prerequisite} is a prerequisite for ${concept} and also needs improvement.`
        };
      }
    }
  }

  let weakestConcept = knowledgeGaps[0];

  for (const concept of knowledgeGaps) {
    if (mastery[concept] < mastery[weakestConcept]) {
      weakestConcept = concept;
    }
  }

  return {
    concept: weakestConcept,
    reason: `${weakestConcept} has the lowest mastery among the current knowledge gaps.`
  };
}

function generateLearningPath(mastery, getPrerequisites) {
  const path = [];

  const concepts = Object.keys(mastery);

  for (const concept of concepts) {
    if (mastery[concept] < 70) {
      const prerequisites = getPrerequisites(concept);

      for (const prerequisite of prerequisites) {
        if (
          mastery[prerequisite] !== undefined &&
          mastery[prerequisite] < 70 &&
          !path.includes(prerequisite)
        ) {
          path.push(prerequisite);
        }
      }

      if (!path.includes(concept)) {
        path.push(concept);
      }
    }
  }

  return path;
}

module.exports = {
  getRecommendedConcept,
  generateLearningPath
};