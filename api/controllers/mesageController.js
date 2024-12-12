const ChatMessage = require('../models/ChatMessage')
// Get chat messages for a room
 const  getChatHistory = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await ChatMessage.findAll({
      where: { roomId },
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).send("Error fetching chat history");
  }
};


module.exports = {
    getChatHistory
  };
  