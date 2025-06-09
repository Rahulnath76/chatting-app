import { uploaadImageToCloudinary } from "../lib/utills/imageUploader.js";
import { sendError, sendSuccess } from "../lib/utills/responseHandler.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: recieverId } = req.params;
    const { text } = req.body;
    const image = req.files?.image;

    if (!mongoose.Types.ObjectId.isValid(recieverId))
      return sendError(res, 400, new Error("Invalid receiver ID"));

    const receiver = await User.findById(recieverId);
    if (!receiver) return sendError(res, 404, new Error("Receiver not found"));

    let imageUrl;
    if (image) {
      const uploadResponse = await uploaadImageToCloudinary(image, "messages");
      imageUrl = uploadResponse.secure_url;
    }

    const messageResponse = await Message.create({
      sender: senderId,
      receiver: recieverId,
      text,
      image: imageUrl,
    });
    sendSuccess(res, 201, messageResponse, "Message send succesfully");
  } catch (error) {
    console.log("erooooorrrororoor   ",error);
    sendError(res, 500, error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: chatId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(chatId))
      return sendError(res, 400, new Error("Invalid receiver ID"));
    const receiver = await User.findById(chatId);
    if (!receiver) return sendError(res, 404, new Error("Receiver not found"));

    const messages = await Message.find({
      $or: [
        { sender: chatId, receiver: userId },
        { sender: userId, receiver: chatId },
      ],
    });

    sendSuccess(res, 200, messages, "Message fetched succesfully");
  } catch (error) {
    console.log(error);
    sendError(res, 500, error.message);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    // const user =
  } catch (error) {}
};

export const editMessage = async (req, res) => {
  // Logic for editing a message
};

export const markAsRead = async (req, res) => {
  // Logic for marking a message as read
};

export const getUnreadMessagesCount = async (req, res) => {
  // Logic for fetching unread messages count
};
