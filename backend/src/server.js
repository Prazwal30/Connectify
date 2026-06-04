import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/user.Routes.js";
import chatRoutes from "./routes/chat.Routes.js";
dotenv.config({ override: true });

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const isAllowedDevOrigin = (origin) => {
  if (!origin) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    const isPrivateNetwork =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
      /^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname);

    return protocol === "http:" && isPrivateNetwork;
  } catch {
    return false;
  }
};

app.use(cors({
  origin: (origin, callback) => {
    callback(null, isAllowedDevOrigin(origin));
  },
  credentials: true//allow frontendto send cokies
  
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

const frontendPath = path.join(__dirname, "../../forntend/dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.log(`Server is already running on http://localhost:${PORT}`);
        process.exit(0);
    }
});

process.once("SIGUSR2", () => {
    server.close(() => process.kill(process.pid, "SIGUSR2"));
});

connectDB().catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});
