import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import bcrypt from "bcryptjs";

export default async function handler(req,res){
  if (req.method !== "POST") return res.status(405).end();
  await connectDB();
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Champs manquants" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email déjà utilisé" });
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ message: "Utilisateur créé", user: { id: user._id, email: user.email, name: user.name } });
}

