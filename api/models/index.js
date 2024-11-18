const sequelize = require("../db/conn"); // Import the Sequelize instance
const User = require("./userModel");
const Doctor = require("./doctorModel");
const Appointment = require("./appointmentModel");
const Notification = require("./notificationModel");

// Sync all models with the database
const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models  synced  successfully.");
  } catch (error) {
    console.error("Error syncing:", error);
  }
};


syncModels();

module.exports = {
  sequelize,
  User,
  Doctor,
  Appointment,
  Notification,
};
