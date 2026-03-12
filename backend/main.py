"""
PromptForge AI — FastAPI Backend
Serves prompt generation endpoints.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prompt_engine import PromptRequest, PromptResponse, generate_prompt

app = FastAPI(
    title="PromptForge AI",
    description="Backend API for AI prompt generation and optimization.",
    version="1.0.0",
)

# Allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "service": "PromptForge AI"}


@app.post("/api/generate", response_model=PromptResponse)
def generate(req: PromptRequest):
    try:
        result = generate_prompt(req)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/options")
def get_options():
    """Return all available roles, tones, and formats for the frontend dropdowns."""
    return {
        "roles": [
            "Assistant", "Expert", "Teacher", "Creative Writer",
            "Analyst", "Developer", "Researcher", "Coach"
        ],
        "tones": [
            "Professional", "Casual", "Technical",
            "Creative", "Academic", "Concise", "Empathetic"
        ],
        "formats": [
            "Plain text", "Bullet points", "Numbered list",
            "JSON", "Step-by-step", "Markdown", "Table"
        ],
    }
