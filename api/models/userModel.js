const { DataTypes } = require("sequelize");
const sequelize = require("../db/conn"); 

const User = sequelize.define("User", {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3],
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5],
    },
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isDoctor: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: "neither",
  },
  mobile: {
    type: DataTypes.BIGINT, 
    allowNull: true, 
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  pic: {
    type: DataTypes.STRING,
    defaultValue:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
}, {
  timestamps: true, // Includes createdAt and updatedAt
});

module.exports = User;
