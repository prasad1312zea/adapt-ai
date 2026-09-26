require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

async function generateExplanation({
  concept,
  mastery,
  level = "beginner",
  difficulty = "medium",
  knowledgeGaps = [],
  reason = ""
}) {

  const prompt = `
You are ADAPT.AI, an intelligent AI tutor for engineering students.

Student Information:
- Concept: ${concept}
- Current Mastery: ${mastery}%
- Student Level: ${level}
- Current Difficulty: ${difficulty}
- Knowledge Gaps: ${knowledgeGaps.join(", ") || "None"}
- Recommendation Reason: ${reason || "No specific reason provided"}

Your task is to teach the student specifically based on their current knowledge.

Rules:
1. If mastery is below 50%, explain from fundamentals.
2. If mastery is between 50% and 70%, explain at moderate depth.
3. If mastery is above 70%, give deeper insights and a challenging example.
4. Use an engineering-related real-world example.
5. Focus specifically on the identified knowledge gap.
6. Do not overwhelm the student.
7. End with one short question to check understanding.
8. Do not mention that you are an AI.

Structure your response as:

## Concept
Brief introduction.

## Explanation
Personalized explanation based on mastery.

## Engineering Example
A practical engineering example.

## Key Takeaway
2-3 important points.

## Quick Check
One question for the student.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt
  });

  return response.text;
}

module.exports = {
  generateExplanation
};