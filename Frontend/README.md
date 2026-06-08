# Growthify - Frontend

This is the frontend client for the Growthify application. It is a modern React Single Page Application (SPA) built for extreme speed and premium aesthetics.

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **Authentication:** Google Identity Services (`@react-oauth/google`)
- **Icons & Animations:** Lucide React, Framer Motion

## ⚙️ Environment Variables
Create a `.env` file in the root of the `Frontend` directory:
```env
# Required for Google Sign-in to work
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
```

## 🚀 Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 🌍 Deployment
This frontend is configured for deployment on **Vercel**. 
*Note:* A `vercel.json` rewrite file is included in this directory to ensure React Router handles page refreshes correctly without throwing a 404 error.
