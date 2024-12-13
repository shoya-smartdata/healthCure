const Appointment = require("../models/appointmentModel");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel"); // Assuming Doctor model exists
const { Op } = require("sequelize");

const getAllAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from middleware
    const isAdmin = req.user.isAdmin;
    const isDoctor = req.user.isDoctor;
    const searchKeyword = req.query.search;

    // Construct where clause based on user type
    let whereClause = {};

    if (isDoctor) {
      // If the user is a doctor, filter by doctorId
      whereClause.doctorId = userId;
    } else if (!isAdmin) {
      whereClause.userId = userId;
    }

    if (searchKeyword) {
      // Apply search filter if keyword is provided
      whereClause = {
        ...whereClause,
        [Op.or]: [
          { userId: { [Op.like]: `%${searchKeyword}%` } },
          { doctorId: { [Op.like]: `%${searchKeyword}%` } },
        ],
      };
    }

    const appointments = await Appointment.findAll({
      where: whereClause,
      include: [
        {
          model: Doctor, // Include associated doctor data
          attributes: ['id', 'fees', 'experience', 'specialization', ], 
        },
        {
          model: User, // Include associated user data
        },
      ],
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Unable to get appointments" });
  }
};


const bookappointment = async (req, res) => {
  try {
    // Get userId from req.user (set by the auth middleware)
    const userId = req.user.id;
    const { doctorId, date, time } = req.body;

    // Ensure the userId exists
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    //
    const doctorCheck = await Doctor.findAll();
    console.log(doctorCheck);
    
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
      content: `You booked an appointment for ${date} at ${time}`,
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
    const { appointmentId } = req.body;
    const doctorId = req.user.id; // Extract doctorId from the middleware

    // Find the appointment by ID
    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).send("Appointment not found");
    }

    // Verify the doctor is associated with the appointment
    if (appointment.doctorId !== doctorId) {
      return res
        .status(403)
        .send("You are not authorized to update this appointment");
    }

    // Update the appointment status to "Completed"
    await appointment.update({ status: "Completed" });

    return res.status(200).send("Appointment status updated to Completed");
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
