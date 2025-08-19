export function buildChainPrompt(role, level, topics, candidateAnswer) {
  const topicsStr = Array.isArray(topics) ? topics.join(', ') : String(topics)
  return `You are an AI Mock Interview Coach for ${role} candidates at ${level} level.
Task: Evaluate the candidate answer and provide an assessment plus a concise, high-level rationale summary (2-4 short bullets) describing the key steps or checks you considered. DO NOT reveal internal chain-of-thought or long private reasoning. Only provide a short, high-level rationale useful for the candidate.
Format: Reply in valid JSON only with these keys:
{
  "type": "feedback",
  "feedback": {
    "score": <0-10>,
    "rubric": { "clarity": <0-10>, "correctness": <0-10>, "depth": <0-10>, "communication": <0-10> },
    "strengths": ["..."],
    "improvements": ["..."],
    "next_steps": ["..."]
  },
  "rationale_summary": ["short bullet 1", "short bullet 2"], 
  "followup": "<string or null>"
}
Context: Topics: ${topicsStr}. Candidate answer: "${candidateAnswer}"
Constraints: keep rationale_summary to 2-4 bullets, each 6-18 words. Keep feedback concise (max ~150 words). Respond with JSON only and nothing else.`
}
