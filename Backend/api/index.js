import serverless from "serverless-http";
import { app, connectDB } from "../app.js";

const handler = serverless(app);

export default async function (req, res) {
  await connectDB();
  return handler(req, res);
}
