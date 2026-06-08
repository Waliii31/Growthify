import serverless from "serverless-http";
import { app, connectDB } from "./app.js";

let isConnected = false;

const cachedConnectDB = async () => {
  if (isConnected) {
    console.log("Using cached MongoDB connection");
    return;
  }
  console.log("Establishing new MongoDB connection...");
  await connectDB();
  isConnected = true;
};

export const handler = serverless(app, {
  request: async (request) => {
    await cachedConnectDB();
  },
});
