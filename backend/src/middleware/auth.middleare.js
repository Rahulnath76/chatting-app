import { sendError } from "../lib/utills/responseHandler.js";
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (!token) return sendError(res, 401, new Error("You are not authorized to access this"));

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) return sendError(res, 401, "Invalid token");

        req.user = decodedToken.user;
        next();
    } catch (error) {
        return sendError(res, 500, "Internal server error");
    }
};