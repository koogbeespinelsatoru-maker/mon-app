import mongoose from "mongoose";
const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: String,
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});
export default mongoose.models.Message || mongoose.model("Message", MessageSchema);

