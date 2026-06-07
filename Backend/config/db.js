import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Please ensure MongoDB is running or provide a valid MONGO_URI in .env");
    // Removed process.exit(1) so the express server stays alive
  }
};

export default connectDB;