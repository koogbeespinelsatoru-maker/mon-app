import http from "http";
import express from "express";
import { Server } from "socket.io";
import { connectDB } from "../lib/db.js";
import User from "../models/User.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const online = new Map();

io.on("connection", (socket) => {
  socket.on("user-online", async (userId) => {
    online.set(userId, socket.id);
    await connectDB();
    const u = await User.findById(userId);
    if (u) { u.online = true; await u.save(); }
    io.emit("user-online", { userId });
  });

  socket.on("user-offline", async (userId) => {
    online.delete(userId);
    await connectDB();
    const u = await User.findById(userId);
    if (u) { u.online = false; await u.save(); }
    io.emit("user-offline", { userId });
  });

  socket.on("send-message", async (payload) => {
    // payload: { senderId, receiverId, text }
    await connectDB();
    const Message = (await import("../models/Message.js")).default;
    const m = await Message.create(payload);
    const dest = online.get(payload.receiverId);
    if (dest) io.to(dest).emit("new-message", m);
    socket.emit("message-sent", m);
  });
});

const PORT = process.env.SOCKET_PORT || 4000;
server.listen(PORT, () => console.log("Socket server running on", PORT));

