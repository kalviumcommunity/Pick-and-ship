import fs from 'fs'

const dataset = [
  { input: "Explain event loop in Node.js", expected: "An explanation of async model and callback queue" },
  { input: "What is normalization in databases?", expected: "Process of structuring data to reduce redundancy" },
  { input: "Explain React useEffect hook", expected: "Side effects management hook" },
  { input: "Difference between SQL and NoSQL", expected: "SQL is relational, NoSQL is non-relational" },
  { input: "What is a REST API?", expected: "API architecture style using HTTP verbs" }
]

export const judgePrompt = `
You are an evaluator. Compare model output with expected answer.
Criteria:
1. Correctness – factual accuracy
2. Clarity – clear explanation
3. Completeness – covers key points
Return JSON: { "score": 1-5, "explanation": "string" }
`

export async function runEvaluation(model, callAI) {
  for (const sample of dataset) {
    const aiResponse = await callAI(sample.input)
    const judgeResponse = await callAI(`${judgePrompt}
Candidate Answer: ${aiResponse}
Expected: ${sample.expected}`)
    console.log("Input:", sample.input)
    console.log("AI Answer:", aiResponse)
    console.log("Judge:", judgeResponse)
    console.log("----")
  }
}
