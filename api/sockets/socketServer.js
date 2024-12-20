const { Server } = require("socket.io");
const ChatMessage = require("../models/ChatMessage"); // Import your message model

const initSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Your front-end URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);


    socket.on("joinRoom", ({ roomId }) => {
      socket.join(roomId); 
      console.log(`User ${socket.id} joined room ${roomId}`);
    });
    socket.on("chatMessage", async ({ roomId, senderId, message }) => {
      try {
        const newMessage = await ChatMessage.create({
          roomId,
          senderId,
          message,
        });

        // Broadcast the message to all users in the room
        io.to(roomId).emit("chatMessage", newMessage); // Emit message to users in the room
      } catch (error) {
        console.error("Error saving chat message:", error.message);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initSocketServer;
