const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");
const Appointment = require("../models/appointmentModel");


const getalldoctors = async (req, res) => {
  try {
    let docs;
    const condition = req.locals
      ? { id: { [Op.ne]: req.locals } }
      : {};

    docs = await Doctor.findAll({
      where: { isDoctor: true, ...condition },
      include: [
        {
          model: User, // No alias here
        }
      ]
    });

    return res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get doctors");
  }
};


const getnotdoctors = async (req, res) => {
  try {
    const docs = await Doctor.findAll({
      where: { isDoctor: false, id: { [Op.ne]: req.locals } },
      include: [
        {
          model: User,
          as: 'user', 
        }
      ]
    });

    return res.status(200).json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get non-doctors");
  }
};

const applyfordoctor = async (req, res) => {
  try {
    if (!req.locals || !req.locals.userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    // Check if the user has already applied to become a doctor
    const alreadyFound = await Doctor.findOne({
      where: { userId: req.locals.userId }
    });

    if (alreadyFound) {
      return res.status(400).json({ message: "Application already exists" });
    }

    // Create the doctor application
    const doctor = await Doctor.create({
      ...req.body.formDetails,
      userId: req.locals.userId,
    });

    return res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error during doctor application submission:", error);
    return res.status(500).json({ message: "Unable to submit application" });
  }
};

const acceptdoctor = async (req, res) => {
  try {
    const { id } = req.body;

    // Update User's isDoctor status to true and set status to "accepted"
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.update({
      isDoctor: true,
      status: "accepted",
    });

    // Update Doctor's isDoctor status to true
    const doctor = await Doctor.findOne({ where: { userId: id } });

    if (doctor) {
      await doctor.update({ isDoctor: true });
    }

    // Create a notification for the user
    const notification = await Notification.create({
      userId: id,
      content: `Congratulations, Your application has been accepted.`,
    });

    return res.status(201).send("Application accepted notification sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while sending notification");
  }
};

const rejectdoctor = async (req, res) => {
  try {
    const { id } = req.body;

    // Update User's isDoctor status to false and set status to "rejected"
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.update({
      isDoctor: false,
      status: "rejected",
    });

    // Delete the doctor's application
    const doctor = await Doctor.findOne({ where: { userId: id } });

    if (doctor) {
      await doctor.destroy();
    }

    // Create a rejection notification for the user
    const notification = await Notification.create({
      userId: id,
      content: `Sorry, Your application has been rejected.`,
    });

    return res.status(201).send("Application rejection notification sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while rejecting application");
  }
};

const deletedoctor = async (req, res) => {
  try {
    const { userId } = req.body;

    // Update the User to remove the doctor status
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.update({ isDoctor: false });

    // Delete the doctor's application record
    const doctor = await Doctor.findOne({ where: { userId } });

    if (doctor) {
      await doctor.destroy();
    }

    // Optionally, you could delete any related appointments if needed
    await Appointment.destroy({ where: { userId } });

    return res.status(200).send("Doctor deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to delete doctor");
  }
};

module.exports = {
  getalldoctors,
  getnotdoctors,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
  deletedoctor,
};
