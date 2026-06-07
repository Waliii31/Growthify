import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next(err);
});

app.use("/api/auth", authRoutes);
app.use("/api/analyses", analysisRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export { app, connectDB };