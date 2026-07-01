import express from "express";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.Routes.js";
import chatRoutes from "./routes/chat.Routes.js";
dotenv.config({ override: true });

const app = express();

const PORT = process.env.PORT || 3001;
const allowedOrigins = [
  "https://connecttifyyy.netlify.app",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Connectify API is running" });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        method: req.method,
        path: req.originalUrl,
    });
});

connectDB().then(() => {
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
});
