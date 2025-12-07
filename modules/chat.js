import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userEmail: String,
  messages: [
    {
      sender: { type: String, enum: ["user", "bot"], required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
