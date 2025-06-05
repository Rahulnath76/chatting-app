import { ZodError } from "zod";
import { loginUserValidator, userValidator } from "../../validators/user.validation.js";
import { generateToken } from "../lib/utills/generateToken.js";
import { sendError, sendSuccess } from "../lib/utills/responseHandler.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { username, fullName, email, password } = userValidator.parse(
      req.body
    );

    const isUserAlready = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlready) {
      return sendError(
        res,
        403,
        new Error("User already exists with this email or username")
      );
    }

    const user = await User.create({
      username,
      fullName,
      email,
      password,
    });

    sendSuccess(res, user, "User registered successfully", 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return sendError(res, 400, error);
    }
    sendError(res, 500, error);
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = loginUserValidator.parse(req.body);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const query = isEmail ? {email: identifier} : {username: identifier};
    const user = await User.findOne(query);

    if (!user) {
      return sendError(res, 404, new Error("User not found, please register"));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return sendError(res, 401, new Error("Password do not match"));
    }

    generateToken(res, user._id);
    user.password = undefined;

    sendSuccess(res, user, "Logged in succesfully", 200);
  } catch (error) {
      console.log(error);
    if (error instanceof ZodError) {
      return sendError(res, 400, error);
    }
    sendError(res, 500, error.message);
  }
};

export const logout = async (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Already logged out or no session found",
    });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

