const {
  runAdaptiveEngine,
  processQuizAnswer
} = require("./adaptiveEngine");


// Diagnostic assessment
function analyzeStudent(assessment) {
  return runAdaptiveEngine(assessment);
}


// Process adaptive quiz answer
function processStudentAnswer(
  mastery,
  concept,
  difficulty,
  isCorrect
) {
  return processQuizAnswer(
    mastery,
    concept,
    difficulty,
    isCorrect
  );
}


module.exports = {
  analyzeStudent,
  processStudentAnswer
};