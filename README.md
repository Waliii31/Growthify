# 🚀 Growthify

**Growthify** is a full-stack, AI-powered LinkedIn content optimization platform. It helps founders, executives, and professionals transform their rough drafts into polished, high-engaging LinkedIn posts using advanced AI models.

## ✨ Key Features
- **🧠 AI Post Optimization:** Submit a rough draft and let the AI rewrite it based on a target *Tone* (e.g., Professional, Bold) and *Audience* (e.g., Founders, Engineers).
- **📊 Predictive Scoring:** Get instant feedback on your post's Hook Strength, Readability Level, and Engagement Probability.
- **📚 Personal Library:** Automatically save all your generated posts to a personal database to edit, view, or publish later.
- **🔐 Google Authentication:** Secure, one-click login using the official Google Identity Services SDK (ID Token Flow).
- **💡 Alternative Hooks:** The AI generates multiple alternative hooks so you can pick the one that fits best.

## 🏗️ Tech Stack Architecture
Growthify is built using a modern microservice architecture, separated into three distinct codebases:

### 1. [Frontend (React + Vite)](./Frontend)
A blazing-fast Single Page Application with premium UI/UX, glassmorphism aesthetics, and smooth micro-animations.
- **Tech:** React 19, Vite, Tailwind CSS v4, React Router, `@react-oauth/google`.
- **Hosting:** Deployed on **Vercel**.

### 2. [Backend (Node.js + Express)](./Backend)
A robust REST API that handles user authentication, database interactions, and routes requests to the AI microservice.
- **Tech:** Node.js (v20), Express, MongoDB + Mongoose, JWT.
- **Hosting:** Deployed on **Render**.

### 3. [AI Agent (Python + FastAPI)](./Agent)
A dedicated Python microservice that strictly handles AI interactions. It utilizes the lightning-fast Groq API to stream LLaMA-3 outputs and format them strictly for LinkedIn (including unicode bold/italics).
- **Tech:** Python 3, FastAPI, Uvicorn, OpenAI SDK (via Groq API).
- **Hosting:** Deployed on **Render**.

## 🚀 Getting Started

To run this project locally, you will need to open 3 separate terminals and start all three services simultaneously. Please refer to the individual `README.md` files inside each folder for detailed setup instructions and required environment variables:
- 📖 [Frontend Setup Guide](./Frontend/README.md)
- 📖 [Backend Setup Guide](./Backend/README.md)
- 📖 [AI Agent Setup Guide](./Agent/README.md)
