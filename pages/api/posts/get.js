import { connectDB } from "../../../lib/db";
import Post from "../../../models/Post";
export default async function handler(req,res){
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 }).limit(100).lean();
  res.json(posts);
}

