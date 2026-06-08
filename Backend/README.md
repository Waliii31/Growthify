# Growthify - Node.js Backend

This is the primary backend REST API for Growthify. It acts as the central hub connecting the React frontend, the MongoDB database, and the Python AI microservice.

## 🛠️ Tech Stack
- **Runtime:** Node.js (Requires v20+)
- **Framework:** Express.js
- **Database:** MongoDB Atlas (via Mongoose)
- **Authentication:** JWT (JSON Web Tokens) & Google Auth Library

## ⚙️ Environment Variables
Create a `.env` file in the root of the `Backend` directory:
```env
# Server Port
PORT=5000

# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/xtract

# Authentication
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

# Microservices
AGENT_URL=http://127.0.0.1:8000  # URL of your Python AI Agent
```

## 🚀 Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   *(Alternatively, run `npm start` for standard node execution).*

## 🌍 Deployment
This backend is configured for deployment as a Web Service on **Render**. Ensure your Render environment is set to use Node 20.x so that MongoDB connection dependencies (like Web Crypto API) function correctly.
