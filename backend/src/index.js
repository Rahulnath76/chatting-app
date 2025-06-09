import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import cloudinaryConnect from "./config/cloudinary.js";
import fileUpload from "express-fileupload";
import { Server } from "socket.io";
import http from "http";
import {initiateSocket} from "./lib/socket.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import friendRoutes from "./routes/friend.routes.js";

dotenv.config();
const app = express();
// console.log(http)
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp"
}))
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/friend", friendRoutes);

dbConnect();
cloudinaryConnect();
initiateSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
