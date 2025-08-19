# AI Mock Interview Coach

## Project Overview
AI Mock Interview Coach helps candidates practice interviews for Frontend, Backend, and Data roles. It asks one question at a time, evaluates your answer against a rubric, and suggests concrete improvements.

---

## Features
- **Role & Level Selection:** (e.g., Frontend, Junior, Arrays/React Basics)
- **Question‑Answer Chat Loop:** with turn limits (e.g., 5 questions)
- **Feedback:** after each answer (clarity, correctness, depth, communication)
- **Final Summary:** with prioritized action items
- **Exportable Transcript + Feedback**

---

## System Design (MVP)
**Client:** React UI (role/topic pickers, chat view, feedback panel)  
**Server:** Express route `/api/interview` to call LLM  
**State:** Client keeps `history[]` of messages; server ensures system prompt + safety rails

```
[ React UI ] <--> [ Express API ] <--> [ LLM Service ]
```

---

## Prompting Strategy
- **RTFC** for the System prompt (Role, Task, Format, Context)
- **Zero‑shot:** to generate first question set
- **One‑shot:** to guide feedback style
- **Multi‑shot:** to lock tone + JSON structure
- **Dynamic Prompting:** inject candidate profile, selected topics, last answer, mistakes seen so far

---

## How To Run (Local)
```bash
pnpm i        # or npm i / yarn
# Set environment variable:
LLM_API_KEY=...
pnpm dev      # or npm run dev
```