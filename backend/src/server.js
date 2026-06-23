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
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
 
  
  credentials: true//allow frontendto send cokies
  
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

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
