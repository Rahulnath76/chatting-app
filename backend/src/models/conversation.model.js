import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ], 
    isGroup: { type: Boolean, default: false },
    groupName: { type: String }, 
    groupImage: { type: String },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
