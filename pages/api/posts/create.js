import { connectDB } from "../../../lib/db";
import Post from "../../../models/Post";
import User from "../../../models/User";

export default async function handler(req,res){
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();
  const { authorId, content, media, mediaType } = req.body;
  if (!authorId || !content) return res.status(400).json({ error: "Champs manquants" });
  const post = await Post.create({ authorId, content, media, mediaType });
  res.status(201).json(post);
}

