import { sendError, sendSuccess } from "../lib/utills/responseHandler.js";
import User from "../models/user.model.js";

export const addFriend = async (req, res) => {
  try {
    const userId = req.userId;
    const { identifier } = req.body;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const query = isEmail ? { email: identifier } : { username: identifier };
    const friend = await User.findOne(query);

    if (!friend) {
      return sendError(
        res,
        404,
        new Error("This userId or email doesnot exist")
      );
    }

    if (friend._id.equals(userId)) {
      return sendError(
        res,
        400,
        new Error("You can't add yourself as a friend")
      );
    }

    const user = await User.findById(userId);

    if (user.friends.includes(friend._id)) {
      console.log("111111111");
      return sendError(res, 400, new Error("User is already your friend"));
    }

    user.friends.push(friend._id);
    friend.friends.push(user._id);
    
    await user.save();
    await friend.save();

    return sendSuccess(res, 200, friend, "Friend added succesfully");
  } catch (error) {
    console.log(error);
    return sendError(res, 500, "Internal server error");
  }
};
