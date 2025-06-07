import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import cloudinaryConnect from "./lib/cloudinary.js";
import fileUpload from "express-fileupload";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

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

dbConnect();
cloudinaryConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
