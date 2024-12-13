import React, { useState, useEffect } from "react";
import Chat from "./Chat"; // Import Chat Component

const DoctorInbox = ({ appointmentChat }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // Modal visibility
  const [currentChat, setCurrentChat] = useState(null); // Current receiver details

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setMessages(appointmentChat);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const openChat = (user) => {
    setCurrentChat(user); // Set the user details for the chat
    setIsChatOpen(true); // Open the chat modal
  };

  const closeChat = () => {
    setIsChatOpen(false); // Close the chat modal
    setCurrentChat(null); // Reset the current chat
  };

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Doctor Inbox</h2>
      {messages.length === 0 ? (
        <p>No messages.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className="flex items-center justify-between p-4 border-b hover:bg-gray-100"
            >
              <div>
                <p className="text-lg font-medium">
                  {message.User.firstname + " " + message.User.lastname}
                </p>
                <p className="text-sm text-gray-600">{message.User.status}</p>
              </div>
              <span
                className={`cursor-pointer px-3 py-1 text-sm rounded-full ${
                  message.status === "new"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
                onClick={() => openChat(message.User)} 
              >
                {message.status === "new" ? "New message" : "Read"}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Chat Modal */}
      {isChatOpen && currentChat && (
        <Chat
          onClose={closeChat}
          receiverId={currentChat.id}
          receiverName={currentChat.firstname + " " + currentChat.lastname}
        />
      )}
    </div>
  );
};

export default DoctorInbox;
