import { connectDB } from "../../../lib/db";
import Message from "../../../models/Message";
export default async function handler(req,res){
  await connectDB();
  const { a, b } = req.query;
  const msgs = await Message.find({ $or: [{ senderId: a, receiverId: b }, { senderId: b, receiverId: a }] }).sort({ createdAt: 1 }).lean();
  res.json(msgs);
}

