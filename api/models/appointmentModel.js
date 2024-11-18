const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn"); 
const User = require("./userModel");

const Appointment = sequelize.define("Appointment", {
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: "id", 
    },
  },
  doctorId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: "id", 
    },
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
}, {
  timestamps: true,
});

module.exports = Appointment;
