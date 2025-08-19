export function buildMultiShotPrompt(role, level, topics, candidateAnswer) {
  const topicsStr = Array.isArray(topics) ? topics.join(', ') : String(topics)
  const exemplars = [
    {
      type: "feedback",
      feedback: {
        score: 9,
        rubric: { clarity: 9, correctness: 9, depth: 8, communication: 9 },
        strengths: ["well-structured solution", "clear complexity analysis"],
        improvements: ["mention edge cases", "optimize memory use in worst case"],
        next_steps: ["write pseudocode", "add tests for boundary cases"]
      },
      question: null,
      followup: "How would you adapt this to handle concurrent inputs?"
    },
    {
      type: "feedback",
      feedback: {
        score: 4,
        rubric: { clarity: 5, correctness: 3, depth: 4, communication: 5 },
        strengths: ["basic idea captured"],
        improvements: ["fix incorrect assumptions about input", "provide time complexity"],
        next_steps: ["re-evaluate approach", "consider alternative data structures"]
      },
      question: null,
      followup: "What happens with empty input and how would you handle it?"
    },
    {
      type: "feedback",
      feedback: {
        score: 7,
        rubric: { clarity: 7, correctness: 7, depth: 6, communication: 7 },
        strengths: ["clear plan", "good reasoning"],
        improvements: ["improve edge-case handling", "discuss trade-offs"],
        next_steps: ["implement small example", "benchmark on sample data"]
      },
      question: null,
      followup: "Could you explain the memory trade-offs of your approach?"
    }
  ]
  const exemplarsStr = exemplars.map(e => JSON.stringify(e)).join('\n\n')
  return `You are an AI interviewer. Below are multiple exemplars illustrating the expected JSON structure, tone, and level of detail. Use them ONLY as examples and do NOT copy them verbatim.

Exemplars:
${exemplarsStr}

Now evaluate the candidate answer and return valid JSON matching the same schema.
Role: ${role}
Level: ${level}
Topics: ${topicsStr}
CandidateAnswer: "${candidateAnswer}"

Expected JSON schema:
{
  "type": "feedback",
  "feedback": {
    "score": <0-10>,
    "rubric": { "clarity": <0-10>, "correctness": <0-10>, "depth": <0-10>, "communication": <0-10> },
    "strengths": ["..."],
    "improvements": ["..."],
    "next_steps": ["..."]
  },
  "question": null,
  "followup": "<string or null>"
}

Respond with valid JSON only and nothing else. Keep feedback concise (max ~200 words). Use professional, encouraging tone. Use temperature 0 for generation.`
}
