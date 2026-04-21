import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "dev_secret";
export function signToken(user) {
  return jwt.sign({ id: user._id || user.id, email: user.email }, SECRET, { expiresIn: "1d" });
}
export function verifyToken(token) {
  try { return jwt.verify(token, SECRET); } catch { return null; }
}

