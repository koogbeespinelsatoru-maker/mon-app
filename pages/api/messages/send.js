import { connectDB } from "../../../lib/db";
import Message from "../../../models/Message";
export default async function handler(req,res){
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();
  const { senderId, receiverId, text } = req.body;
  if (!senderId || !receiverId || !text) return res.status(400).json({ error: "Champs manquants" });
  const msg = await Message.create({ senderId, receiverId, text });
  res.status(201).json(msg);
}

