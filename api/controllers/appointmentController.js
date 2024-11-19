const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel"); // Assuming Doctor model exists
const { Op } = require("sequelize");

const getAllAppointments = async (req, res) => {
  try {
    const searchKeyword = req.query.search;

    const whereClause = searchKeyword
      ? {
          [Op.or]: [
            { userId: searchKeyword }, // Matches userId
            { doctorId: searchKeyword }, // Matches doctorId
          ],
        }
      : {};

    const appointments = await Appointment.findAll({
      where: whereClause,
      include: [
        {
          model: Doctor, // Include associated doctor data
          as: "doctor", // Make sure `as` matches your association alias
        },
        {
          model: User, // Include associated user data
          as: "user", // Make sure `as` matches your association alias
        },
      ],
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send("Unable to get appointments");
  }
};

const bookappointment = async (req, res) => {
  try {
    // Assuming req.locals holds the current user's ID
    const userId = req.locals;
    const { doctorId, doctorname, date, time } = req.body;

    // Create a new appointment
    const appointment = await Appointment.create({
      date,
      time,
      doctorId,
      userId,
    });

    // Send notification to the user
    const userNotification = await Notification.create({
      userId,
      content: `You booked an appointment with Dr. ${doctorname} for ${date} at ${time}`,
    });

    // Get the user data
    const user = await User.findByPk(userId);

    // Send notification to the doctor
    const doctorNotification = await Notification.create({
      userId: doctorId,
      content: `You have an appointment with ${user.firstname} ${user.lastname} on ${date} at ${time}`,
    });

    return res.status(201).json(appointment);
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).send("Unable to book appointment");
  }
};

const completed = async (req, res) => {
  try {
    const { appointid, doctorId, doctorname } = req.body;
    const userId = req.locals;

    // Update the appointment status to 'Completed'
    const appointment = await Appointment.findByPk(appointid);

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    await appointment.update({ status: "Completed" });

    // Send notification to the user
    const userNotification = await Notification.create({
      userId,
      content: `Your appointment with Dr. ${doctorname} has been completed`,
    });

    // Get the user data
    const user = await User.findByPk(userId);

    // Send notification to the doctor
    const doctorNotification = await Notification.create({
      userId: doctorId,
      content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
    });

    return res.status(200).send("Appointment completed");
  } catch (error) {
    console.error("Error completing appointment:", error);
    res.status(500).send("Unable to complete appointment");
  }
};

module.exports = {
  getAllAppointments,
  bookappointment,
  completed,
};
