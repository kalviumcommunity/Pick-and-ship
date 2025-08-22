// server/tokenLogger.js
import { encode } from 'gpt-3-encoder'

// Wrapper for AI calls
export async function callAIWithLogging(prompt, callAI) {
  const tokens = encode(prompt).length
  console.log(`Prompt used ${tokens} tokens`)
  
  const response = await callAI(prompt)
  const responseTokens = encode(response).length
  console.log(`Response used ${responseTokens} tokens`)
  console.log(`Total tokens: ${tokens + responseTokens}`)
  
  return response
}
