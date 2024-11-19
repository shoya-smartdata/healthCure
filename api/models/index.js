const sequelize = require("../db/conn"); // Import the Sequelize instance
const User = require("./userModel");
const Doctor = require("./doctorModel");
const Appointment = require("./appointmentModel");
const Notification = require("./notificationModel");

// In appointmentModel.js
Appointment.belongsTo(User, { foreignKey: 'userId' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId' });
Appointment.hasMany(Notification, { foreignKey: 'userId' });

// In userModel.js
User.hasMany(Appointment, { foreignKey: 'userId' });
User.hasMany(Notification, { foreignKey: 'userId' });

// In doctorModel.js
Doctor.hasMany(Appointment, { foreignKey: 'doctorId' });
Doctor.hasMany(Notification, { foreignKey: 'userId' });
// In doctorModel.js
Doctor.belongsTo(User, { foreignKey: 'userId' });


// In userModel.js
User.hasOne(Doctor, { foreignKey: 'userId' });



Appointment.belongsTo(User, { foreignKey: "userId" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId" });

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
