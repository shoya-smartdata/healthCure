const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn"); // Adjust the path based on your setup
const User = require("./userModel"); // Import the User model for associations

const Doctor = sequelize.define("Doctor", {
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User, // Refers to the User model
      key: "id", // Refers to the primary key of the User model
    },
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDoctor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = Doctor;
