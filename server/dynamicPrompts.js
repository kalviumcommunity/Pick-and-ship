export const SYSTEM_PROMPT = `
ROLE: You are an AI Mock Interview Coach for {role} candidates at {level} level.
TASK: Conduct one interview turn at a time. If this is the first turn (k=1), generate the first question. After each candidate answer, evaluate using the rubric and provide feedback plus a follow-up question. If interview is finished (k>N) provide a final summary with prioritized action items.
FORMAT: Always return JSON only. Use keys: {"type":"interviewer|feedback|summary", "question": string|null, "feedback": { "score": number, "rubric": {"clarity": number, "correctness": number, "depth": number, "communication": number}, "strengths": [string], "improvements": [string], "next_steps": [string] } | null, "followup": string|null}
CONTEXT: Role={role}, Level={level}, Topics={topics[]}, Profile={profile}, Turn={k}/{N}, PastMistakes={mistakes[]}. If candidate has repeated mistakes, reduce difficulty and give a hint. Keep all feedback concise (max ~200 words) and supportive.
`

export const buildTurnPrompts = ({ role = 'Frontend', level = 'Junior', topics = [], profile = 'not provided', k = 1, N = 5, mistakes = [], lastAnswer = '' }) => {
  const topicsStr = Array.isArray(topics) ? topics.join(', ') : String(topics)
  const system = SYSTEM_PROMPT
    .replace('{role}', role)
    .replace('{level}', level)
    .replace('{topics[]}', topicsStr)
    .replace('{profile}', profile)
    .replace('{k}', String(k))
    .replace('{N}', String(N))
    .replace('{mistakes[]}', Array.isArray(mistakes) ? mistakes.join(', ') : String(mistakes))

  const user = `You will receive the interview question. I will answer. Evaluate my answer using the rubric then move to the next question. My answer: "${lastAnswer}"`
  return [{ role: 'system', content: system }, { role: 'user', content: user }]
}
