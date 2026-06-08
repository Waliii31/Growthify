import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Render and Node 18+ often have IPv6 resolution issues with MongoDB Atlas.
    // serverSelectionTimeoutMS: 5000 ensures it fails quickly instead of hanging.
    // family: 4 forces IPv4, which usually fixes the timeout issue.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4, 
    });

    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Please ensure MongoDB is running or provide a valid MONGO_URI in .env");
  }

  mongoose.connection.on('error', err => {
    console.error("Mongoose connection runtime error:", err);
  });
  
  mongoose.connection.on('disconnected', () => {
    console.warn("Mongoose lost connection to the database");
  });
};

export default connectDB;