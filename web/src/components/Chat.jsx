import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../middleware/AuthContext";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // Selected user for chat
  const user = useAuth(); // Get logged-in user info
  const [availableUsers, setAvailableUsers] = useState([]); // List of available users to chat with

  // Function to generate a unique room ID based on user IDs
  const generateRoomId = (user1, user2) => {
    // Ensure consistent roomId by sorting user IDs alphabetically
    const ids = [user1, user2].sort();
    return `${ids[0]}-${ids[1]}`;
  };

  // Fetch available users (this can be done through an API)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/user/getallusers");
        const data = await response.json();

        // Log the full response to understand its structure
        console.log("Full response:", data);

        // Check if the response is already an array (no need to access .users)
        if (Array.isArray(data)) {
          setAvailableUsers(data); // Directly set the array of users
        } else if (data && Array.isArray(data.users)) {
          setAvailableUsers(data.users); // If the users are nested inside data.users
        } else {
          console.error("API response structure is unexpected:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return; // Don't initialize socket until a user is selected

    // Create a socket instance
    const socketInstance = io("http://localhost:3030", {
      transports: ["websocket"],
    });

    setSocket(socketInstance);

    // Generate roomId based on sender and selected user
    const roomId = generateRoomId(user.user.userId, selectedUser);

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
  }, [selectedUser, user]);

  // Send message to the selected user
  const sendMessage = () => {
    if (socket && newMessage.trim() && selectedUser) {
      const roomId = generateRoomId(user.user.userId, selectedUser);
      socket.emit("chatMessage", { roomId, senderId: user.user.userId, message: newMessage });
      setNewMessage(""); // Clear input field
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Chat with Users</h1>

      {/* User selection */}
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser}
          className="p-2 border border-gray-300 rounded w-full"
        >
          <option className="text-red-200" value="">Select a user</option>
          {/* Safely check if availableUsers is an array before calling .map() */}
          {Array.isArray(availableUsers) && availableUsers.length > 0 ? (
            availableUsers.map((availableUser) => (
              <option  key={availableUser.id} value={availableUser.id}>
                {availableUser.firstname+  ''+ availableUser.lastname}
              </option>
            ))
          ) : (
            <option value="">No users available</option>
          )}
        </select>
      </div>

      {/* Chat messages */}
      <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-lg h-96 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong className="text-blue-500">{msg.senderId}:</strong>{" "}
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* New message input */}
      <div className="flex items-center space-x-2">
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
  );
};

export default Chat;
