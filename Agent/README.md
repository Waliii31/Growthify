# Growthify - AI Agent Microservice

This is the dedicated Python microservice responsible for generating and formatting the LinkedIn posts using Large Language Models. By decoupling the AI logic into its own microservice, we ensure high performance and strict formatting rules (like parsing Markdown into LinkedIn-compatible Unicode).

## 🛠️ Tech Stack
- **Language:** Python 3
- **Framework:** FastAPI
- **Server:** Uvicorn
- **AI Provider:** Groq API (Running LLaMA-3-70B)

## ⚙️ Environment Variables
Create a `.env` file in the root of the `Agent` directory:
```env
# Required to fetch AI generations from Groq
GROQ_API_KEY=your_groq_api_key_here
```

## 🚀 Running Locally
1. It is recommended to create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn app:app --reload --host 127.0.0.1 --port 8000
   ```
   *(You can test the API by navigating to `http://127.0.0.1:8000/docs` to see the Swagger UI).*

## 🌍 Deployment
This agent is deployed as a Web Service on **Render** (Language: Python 3).
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `uvicorn app:app --host 0.0.0.0 --port $PORT`

*Note: Render's free tier spins down services after 15 minutes of inactivity. First requests after inactivity may take ~60 seconds to complete while the instance wakes up.*
