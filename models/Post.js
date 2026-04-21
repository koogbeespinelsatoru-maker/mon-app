import mongoose from "mongoose";
const PostSchema = new mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  media: String,
  mediaType: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Post || mongoose.model("Post", PostSchema);

