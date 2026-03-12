"""
Prompt Engine — Core logic for PromptForge AI
Assembles, structures, and enhances prompts based on user input.
"""

from pydantic import BaseModel
from typing import Optional
import re

# ─── Request / Response Models ────────────────────────────────────────────────

class PromptRequest(BaseModel):
    task: str
    role: str = "Assistant"
    tone: str = "Professional"
    format: str = "Plain text"
    context: Optional[str] = ""
    extra_instructions: Optional[str] = ""

class PromptResponse(BaseModel):
    prompt: str
    token_estimate: int
    quality_score: int
    tips: list[str]

# ─── Template Blocks ──────────────────────────────────────────────────────────

ROLE_DESCRIPTIONS = {
    "Assistant":       "a highly capable AI assistant",
    "Expert":          "a world-class domain expert with deep subject matter knowledge",
    "Teacher":         "an experienced educator skilled at making complex concepts accessible",
    "Creative Writer": "a talented creative writer with a vivid imagination and compelling narrative style",
    "Analyst":         "a rigorous analytical thinker who excels at data-driven reasoning",
    "Developer":       "a senior software engineer with expertise across multiple programming languages and architectures",
    "Researcher":      "a meticulous academic researcher with a thorough and objective approach",
    "Coach":           "a motivational life and performance coach focused on actionable advice",
}

TONE_DESCRIPTORS = {
    "Professional":  "Use formal, precise, and authoritative language.",
    "Casual":        "Use friendly, conversational, and approachable language.",
    "Technical":     "Use technical terminology, code examples where relevant, and be highly specific.",
    "Creative":      "Use imaginative, evocative, and original language with creative flair.",
    "Academic":      "Use scholarly language with clear citations of reasoning and structured arguments.",
    "Concise":       "Be brief and to the point. Eliminate all unnecessary words.",
    "Empathetic":    "Use warm, understanding, and supportive language that acknowledges emotions.",
}

FORMAT_INSTRUCTIONS = {
    "Plain text":    "Respond in clear, flowing prose paragraphs.",
    "Bullet points": "Structure your response as a concise, well-organized bulleted list.",
    "Numbered list": "Use a numbered, step-by-step structure for your response.",
    "JSON":          "Return your response as valid, well-formatted JSON only — no prose outside the JSON.",
    "Step-by-step":  "Break down your response into clearly labeled, sequential steps.",
    "Markdown":      "Format your response using Markdown with appropriate headers, bold text, and code blocks.",
    "Table":         "Present the information in a well-structured Markdown table.",
}

# ─── Prompt Generation ────────────────────────────────────────────────────────

def generate_prompt(req: PromptRequest) -> PromptResponse:
    """Assemble a structured, high-quality prompt from user inputs."""

    role_desc  = ROLE_DESCRIPTIONS.get(req.role, f"an expert {req.role}")
    tone_desc  = TONE_DESCRIPTORS.get(req.tone, f"a {req.tone.lower()} tone.")
    fmt_desc   = FORMAT_INSTRUCTIONS.get(req.format, "Present your response in a clear and organized manner.")

    sections: list[str] = []

    # 1. Role assignment
    sections.append(f"You are {role_desc}.")

    # 2. Tone directive
    sections.append(tone_desc)

    # 3. Context block (if provided)
    if req.context and req.context.strip():
        sections.append(f"## Context\n{req.context.strip()}")

    # 4. Task block
    sections.append(f"## Task\n{req.task.strip()}")

    # 5. Output format directive
    sections.append(f"## Output Format\n{fmt_desc}")

    # 6. Extra instructions (if provided)
    if req.extra_instructions and req.extra_instructions.strip():
        sections.append(f"## Additional Instructions\n{req.extra_instructions.strip()}")

    # 7. Closing quality directive
    sections.append(
        "Ensure your response is accurate, thorough, and directly addresses the task. "
        "If any part of the request is ambiguous, state your assumptions clearly."
    )

    prompt = "\n\n".join(sections)
    token_estimate = estimate_tokens(prompt)
    quality_score  = compute_quality_score(req)
    tips           = generate_tips(req)

    return PromptResponse(
        prompt=prompt,
        token_estimate=token_estimate,
        quality_score=quality_score,
        tips=tips,
    )


# ─── Helpers ──────────────────────────────────────────────────────────────────

def estimate_tokens(text: str) -> int:
    """Rough token estimate: ~4 chars per token (OpenAI approximation)."""
    return max(1, len(text) // 4)


def compute_quality_score(req: PromptRequest) -> int:
    """
    Score 0–100 based on how complete the prompt request is.
    Each field contributes points.
    """
    score = 0
    score += 30 if len(req.task.strip()) > 20 else 15  # task length
    score += 20  # role always provided
    score += 15  # tone always provided
    score += 15  # format always provided
    score += 10 if req.context and len(req.context.strip()) > 10 else 0
    score += 10 if req.extra_instructions and len(req.extra_instructions.strip()) > 5 else 0
    return min(score, 100)


def generate_tips(req: PromptRequest) -> list[str]:
    """Return actionable improvement tips based on what's missing."""
    tips = []
    if len(req.task.strip()) < 20:
        tips.append("💡 Make your task description more specific for better results.")
    if not req.context or len(req.context.strip()) < 10:
        tips.append("📝 Adding context about your audience or use case can improve output quality.")
    if not req.extra_instructions or len(req.extra_instructions.strip()) < 5:
        tips.append("⚙️ Use 'Extra Instructions' to add constraints like word limits or style rules.")
    if req.format == "Plain text":
        tips.append("📋 Try a structured format (Bullet points, Step-by-step) for clearer outputs.")
    if not tips:
        tips.append("✅ Great prompt! Your inputs are comprehensive and well-specified.")
    return tips
