# ⚡ PromptForge AI

> Craft optimized, structured prompts for any AI model — with precision and ease.

**PromptForge AI** is a full-stack prompt generation tool that helps users build high-quality AI prompts by specifying role, tone, output format, context, and constraints through a premium, intuitive UI.

---

## ✨ Features

- 🎯 **Structured prompt assembly** — role, tone, format, context, and constraints
- 📊 **Quality scoring** — see how comprehensive your prompt is (0–100)
- 💡 **Improvement tips** — actionable suggestions to refine your prompt
- 🪙 **Token estimate** — before you paste into any model
- 📋 **One-click copy** to clipboard
- 🌙 **Premium dark UI** — glassmorphism, animated orbs, neon accents

---

## 🗂 Project Structure

```
promptforge-ai/
├── backend/
│   ├── main.py           ← FastAPI app (endpoints + CORS)
│   ├── prompt_engine.py  ← Prompt generation logic + Pydantic models
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx       ← React entry point
        ├── App.jsx        ← Two-panel layout + global state
        ├── PromptForm.jsx ← Input form component
        ├── OutputPanel.jsx← Output display + copy + quality bar
        ├── api.js         ← Backend fetch calls
        └── index.css      ← Premium dark glassmorphism styles
```

---

## 🚀 Getting Started

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`  
API docs at: `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/health` | Health check |
| `GET`  | `/api/options` | Available roles, tones, formats |
| `POST` | `/api/generate` | Generate a prompt |

### POST `/api/generate` payload

```json
{
  "task": "Write a blog post about sustainable tech",
  "role": "Expert",
  "tone": "Professional",
  "format": "Markdown",
  "context": "Audience: tech-savvy readers aged 25–40",
  "extra_instructions": "Max 800 words, use subheadings"
}
```
