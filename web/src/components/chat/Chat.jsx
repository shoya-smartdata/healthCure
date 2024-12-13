import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../middleware/AuthContext";

const Chat = ({ onClose, receiverId, receiverName }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useAuth(); // Get logged-in user info

  // Function to generate a unique room ID based on user IDs
  const generateRoomId = (user1, user2) => {
    const ids = [user1, user2].sort(); // Ensure consistent roomId by sorting user IDs alphabetically
    return `${ids[0]}-${ids[1]}`;
  };

  useEffect(() => {
    if (!receiverId) return; // Wait until a receiverId is provided

    // Create a socket instance
    const socketInstance = io("http://localhost:3030", {
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    // Generate roomId based on sender and receiver
    const roomId = generateRoomId(user.user.userId, receiverId);

    // Join the generated chat room
    socketInstance.emit("joinRoom", { roomId });

    // Listen for incoming messages
    socketInstance.on("chatMessage", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    });
    

    // Cleanup socket connection when component is unmounted
    return () => {
      socketInstance.disconnect();
    };
  }, [receiverId, user]);

  // Send message to the receiver
// Send message to the receiver
const sendMessage = () => {
    if (socket && newMessage.trim() && receiverId) {
      const roomId = generateRoomId(user.user.userId, receiverId);
      const messageData = { roomId, senderId: user.user.userId, message: newMessage };
  
      // Emit the message to the server
      socket.emit("chatMessage", messageData);
  
      // Clear the input field
      setNewMessage("");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-2/3 lg:w-1/2 flex flex-col h-3/4">
        {/* Header */}
        <div className="p-4 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Chat with {receiverName || "User"}
          </h2>
          <button
            onClick={onClose}
            className="bg-indigo-500 hover:bg-indigo-700 text-white rounded-full px-4 py-1"
          >
            Close
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.senderId === user.user.userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.senderId === user.user.userId
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-300 text-gray-900"
                } px-4 py-2 rounded-lg max-w-xs sm:max-w-md`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* New message input */}
        <div className="p-4 bg-gray-200 rounded-b-lg flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Type your message"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
