import { uploaadImageToCloudinary } from "../lib/utills/imageUploader.js";
import { sendError, sendSuccess } from "../lib/utills/responseHandler.js";
import Conversation from "../models/conversation.model.js";
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

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recieverId], $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recieverId],
      });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await uploaadImageToCloudinary(image, "messages");
      imageUrl = uploadResponse.secure_url;
    }

    const messageResponse = await Message.create({
      conversationId: conversation._id,
      sender: senderId,
      text,
      image: imageUrl,
    });
    conversation.lastMessage = messageResponse._id;
    conversation.updatedAt = new Date();
    await conversation.save();

    await messageResponse.populate("sender", "avatar fullName");
    
    const currentTime = new Date();
    await User.updateMany(
      { _id: { $in: [senderId, recieverId]} },
      { lastMessageTime: currentTime }
    );

    sendSuccess(
      res,
      201,
      messageResponse,
      "Message send succesfully",
      "message"
    );
  } catch (error) {
    console.log("erooooorrrororoor   ", error);
    sendError(res, 500, error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: otherUserId  } = req.params;
    const currentUserId = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    console.log(page, limit);
    
    const skip = (page - 1) * limit;

    if (!mongoose.Types.ObjectId.isValid(otherUserId )) {
      return sendError(res, 400, new Error("Invalid receiver ID"));
    }

    const otherUser = await User.findById(otherUserId );
    if (!otherUser) {
      return sendError(res, 404, new Error("User not found"));
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [currentUserId, otherUserId ], $size: 2 },
    });

    if (!conversation) {
      return sendSuccess(res, 200, {
        messages: [],
        hasMore: false,
        totalCount: 0,
        currentPage: page
      },
       "No messages found", "messages");
    }

    const totalCount = await Message.countDocuments({
      conversationId: conversation._id
    });

    const messages = await Message.find({
      conversationId: conversation._id,
    }).populate('sender', 'avatar fullName')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    console.log(totalCount > skip + limit);
    sendSuccess(res, 200, {
      messages: messages.reverse(),
      hasMore: totalCount > (skip + limit),
      totalCount,
      currentPage: page
    }, "Message fetched succesfully", "messages");
  } catch (error) {
    console.log(error)
    sendError(res, 500, error.message);
  }
};
