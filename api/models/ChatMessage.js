const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn");

const ChatMessage = sequelize.define("ChatMessage", {
  roomId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true, 
});

module.exports = ChatMessage;
