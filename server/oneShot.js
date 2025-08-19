export function buildOneShotPrompt(role, level, topics, candidateAnswer) {
  const topicsStr = Array.isArray(topics) ? topics.join(', ') : String(topics)
  const example = JSON.stringify({
    type: "feedback",
    feedback: {
      score: 8,
      rubric: { clarity: 8, correctness: 8, depth: 7, communication: 9 },
      strengths: ["clear high-level plan", "good complexity"],
      improvements: ["edge cases (empty input)", "space tradeoffs"],
      next_steps: ["ask about streaming variant"]
    },
    question: null,
    followup: "How would your approach change for streaming input?"
  })
  return `You are an AI interviewer. Here is ONE example of ideal feedback to set the style and JSON schema. Use it as an example only — do NOT copy it verbatim.\n\nExampleCandidateAnswer: \"I would use a hash map to count...\"\nExampleFeedback JSON:\n${example}\n\nNow evaluate the candidate answer below and return valid JSON only, exactly matching the schema. Do NOT add any extra text, explanation, or markdown.\n\nRole: ${role}\nLevel: ${level}\nTopics: ${topicsStr}\nCandidateAnswer: \"${candidateAnswer}\"\n\nExpected JSON format:\n{\n  \"type\": \"feedback\",\n  \"feedback\": {\n    \"score\": <number 0-10>,\n    \"rubric\": { \"clarity\": <0-10>, \"correctness\": <0-10>, \"depth\": <0-10>, \"communication\": <0-10> },\n    \"strengths\": [\"...\"],\n    \"improvements\": [\"...\"],\n    \"next_steps\": [\"...\"]\n  },\n  \"question\": null,\n  \"followup\": \"<string or null>\"\n}\n\nKeep feedback concise (max ~200 words). Use a professional, encouraging tone.`
}
