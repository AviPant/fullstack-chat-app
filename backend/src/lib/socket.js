import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});


// ✅ Track userId -> socketId
const userSocketMap = {}; // ✅ renamed for clarity

// ✅ Helper function to get socket ID of a user
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // Removed extraction of userId from handshake.query as it's undefined in recent socket.io versions
  // User will be added via the "addUser" event below

  socket.on("addUser", (userId) => {
    // ✅ Store mapping
    userSocketMap[userId] = socket.id;

    // ✅ Emit current online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("👥 Online Users:", Object.keys(userSocketMap));
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);

    // ✅ Remove user from map
    for (const [userId, sockId] of Object.entries(userSocketMap)) {
      if (sockId === socket.id) {
        delete userSocketMap[userId];
        break;
      }
    }

    // ✅ Re-broadcast updated user list
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
