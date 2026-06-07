import os
import json
import re
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS since the Express backend or React frontend might call this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client with Groq's base URL and API key
groq_api_key = os.environ.get("GROQ_API_KEY")
if not groq_api_key:
    print("WARNING: GROQ_API_KEY is not set in the environment.")

client = AsyncOpenAI(
    api_key=groq_api_key,
    base_url="https://api.groq.com/openai/v1",
)

def to_unicode_style(text: str, style: str) -> str:
    upper_start = 0x1D5D4 if style == "bold" else 0x1D608
    lower_start = 0x1D5EE if style == "bold" else 0x1D622
    digit_start = 0x1D7EC

    chars = []
    for char in text:
        code = ord(char)
        if 65 <= code <= 90:
            chars.append(chr(upper_start + code - 65))
        elif 97 <= code <= 122:
            chars.append(chr(lower_start + code - 97))
        elif style == "bold" and 48 <= code <= 57:
            chars.append(chr(digit_start + code - 48))
        else:
            chars.append(char)
    return "".join(chars)

def normalize_linkedin_styling(text: str) -> str:
    replacements = [
        (r"<\s*b\s*>(.*?)<\s*/\s*b\s*>", "bold"),
        (r"<\s*strong\s*>(.*?)<\s*/\s*strong\s*>", "bold"),
        (r"<\s*i\s*>(.*?)<\s*/\s*i\s*>", "italic"),
        (r"<\s*em\s*>(.*?)<\s*/\s*em\s*>", "italic"),
        (r"\*\*(.*?)\*\*", "bold"),
        (r"__(.*?)__", "bold"),
        (r"(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)", "italic"),
    ]

    cleaned = text
    for pattern, style in replacements:
        cleaned = re.sub(
            pattern,
            lambda match: to_unicode_style(match.group(1), style),
            cleaned,
            flags=re.IGNORECASE | re.DOTALL,
        )

    return re.sub(r"<[^>]+>", "", cleaned)

class AnalysisRequest(BaseModel):
    draftText: str
    tone: str
    audience: str

system_prompt = """
You are an expert LinkedIn ghostwriter and content editor.
You are given a raw draft, a target tone, and a target audience.
Your job is to polish the draft into a ready-to-copy LinkedIn post and return the result STRICTLY as a JSON object that matches the following schema:

{
  "optimizedText": "The fully optimized LinkedIn post, ready to paste directly into LinkedIn.",
  "score": integer between 0 and 100 representing the predicted engagement score,
  "hookStrength": "Excellent" | "Strong" | "Average" | "Poor",
  "readability": "7th Grade" | "9th Grade" | "College Level",
  "engagementProbability": "High" | "Medium" | "Low",
  "tags": ["#Tag1", "#Tag2", "#Tag3"],
  "alternativeHooks": [
    { "type": "A brief description of the hook type", "text": "The actual alternative hook text" },
    { "type": "Another type", "text": "Another hook text" }
  ],
  "aiFeedback": [
    { "type": "success" | "info" | "warning", "text": "A piece of specific, actionable feedback" }
  ]
}

CRITICAL OUTPUT RULES:
1. ONLY return the raw JSON object. Do not include markdown blocks like ```json ... ```.
2. The response must be valid parseable JSON.
3. Do not flatten the post into one paragraph. Use real newline characters between short paragraphs.
4. Preserve the user's core story, sequence, personal tone, link, and hashtags. Do not replace a strong personal post with generic marketing copy.
5. Improve wording only where it makes the post sharper, clearer, or more engaging.
6. Keep the post human, direct, and specific. Avoid filler like "Hey everyone", "I just wanted to share", "thrilled with the result", or excessive emojis.
7. Keep emojis intentional. Use no more than 5 emojis in the optimized post unless the draft already uses more.
8. Keep the final post ready to paste into LinkedIn with no extra explanation.

LINKEDIN FORMATTING RULES:
1. LinkedIn does not support markdown. Never use **bold**, __bold__, *italic*, markdown headings, or markdown tables.
2. For emphasis, use Unicode styled text characters directly in optimizedText.
3. Use bold Unicode sparingly for the hook, important words, section labels, or key metrics.
4. Use italic Unicode sparingly for a short aside or punchline.
5. If a list helps the post, use clean bullets or numbered lines with spacing:
   - Bullets: "• item"
   - Numbers: "1. item"
6. Do not over-style every sentence. The post should look polished, not noisy.
7. If the input already uses styled Unicode text, preserve that premium visual style unless it hurts readability.

QUALITY BAR:
The optimizedText should feel better than the user's draft: stronger hook, better rhythm, polished spacing, tasteful Unicode emphasis, and a clear CTA. It must not be shorter, flatter, or more generic than the original unless the original is very weak.
"""

@app.post("/api/analyze")
async def analyze_draft(req: AnalysisRequest):
    if not groq_api_key:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured.")

    try:
        user_message = f"""
Edit this LinkedIn draft. Do not rewrite it from scratch.

Keep the same story, same facts, same link, same CTA, and the same personal voice.
Preserve the draft's paragraph spacing when it is already strong.
Only improve rhythm, clarity, hook strength, tasteful LinkedIn Unicode styling, bullets/numbers where useful, and final polish.

Draft:
{req.draftText}

Target Tone: {req.tone}
Target Audience: {req.audience}
"""

        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            temperature=0.15,
            max_completion_tokens=2048,
            response_format={"type": "json_object"}
        )

        content = response.choices[0].message.content
        
        # Groq guarantees JSON object output when response_format is set.
        parsed_data = json.loads(content)
        if isinstance(parsed_data.get("optimizedText"), str):
            parsed_data["optimizedText"] = normalize_linkedin_styling(parsed_data["optimizedText"])
        for hook in parsed_data.get("alternativeHooks", []):
            if isinstance(hook.get("text"), str):
                hook["text"] = normalize_linkedin_styling(hook["text"])
        return parsed_data

    except Exception as e:
        print(f"Error calling Groq API: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
