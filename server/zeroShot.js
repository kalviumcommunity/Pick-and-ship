export function buildZeroShotPrompt(role, level, topics) {
  const topicsStr = Array.isArray(topics) ? topics.join(', ') : String(topics)
  return `You are an AI interviewer. Generate the FIRST interview question ONLY for Role=${role}, Level=${level}, Topics=${topicsStr}. Keep it concise. Do NOT include answers, hints, or explanation. Respond with valid JSON only and nothing else, exactly in this format:
{"type":"interviewer","question":"<the question>"}`
}
