const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn"); 
const User = require("./userModel"); 

const Notification = sequelize.define("Notification", {
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User, 
      key: "id", 
    },
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  content: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
}, {
  timestamps: true, 
});

module.exports = Notification;
