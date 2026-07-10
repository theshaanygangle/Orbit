import express, { Router } from "express";
import http, { get } from "http";
import { Server as IOServer } from "socket.io";

import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import authRouter from "./routes/authRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import groupRouter from "./routes/groupRoutes.js";
import { register, login } from "./controllers/authController.js";
import { userAuthMiddleware } from "./middleware/authMiddleware.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Socket } from "dgram";
import { error } from "console";
import { rootCertificates } from "tls";
import mongoose from "mongoose";
import chatModel from "./models/chatModel.js";
import { socketManager } from "./utils/socketManager.js";

//MongoDB Connection
connectDB();

const app = express();
const port = process.env.PORT || 6001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// ✅ 1. Create HTTP server
const httpServer = http.createServer(app);

// ✅ 2. Attach Socket.IO
const io = new IOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: [get, post],
    credentials: true,
  },
});

// ✅ 3. Middleware to verify JWT before socket connection
io.use((Socket, next) => {
  try {
    //Create Token
    const token = Socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Authentication error: token required"));
    }

    // support "Bearer <token>" or raw token
    const raw = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
    const payload = jwt.verify(raw, process.env.JWT_SECRET);
    Socket.user = payload;
    next();
  } catch (error) {
    next(new Error("Authentication Error At IO!"));
  }
});

// ✅ 4. Socket.io events
socketManager(io);

// Server API
app.get("/", (req, res) => {
  res.send("Server is running");
});

//API Open Endpoints
app.post("/api/v1/register", register);
app.post("/api/v1/login", login);

//Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/message", messageRouter);

// ✅ 5. Start server
httpServer.listen(port, () => {
  console.log(`🚀 HTTP Server running on port ${port}`);
});

app.listen(port, () => {
  console.log(`✅ Server started on PORT : http://localhost:${port}`);
});
