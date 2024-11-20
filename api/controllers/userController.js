const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

const getuser = async (req, res) => {
  try {
    // Find user by ID and exclude the password field
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }, // Exclude the password from the response
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    // Get all users except the logged-in user
    const users = await User.findAll({
      where: {
        id: { [Op.ne]: req.locals }, // Exclude the logged-in user from the result
      },
      attributes: { exclude: ["password"] }, // Exclude password field
    });
   
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get all users");
  }
};

 // Replace with your actual User model path

const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
  
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const register = async (req, res) => {
  try {
    const emailPresent = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailPresent) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashedPass,
    });

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Unable to register user" });
  }
};


const updateprofile = async (req, res) => {
  try {
    // Hash the new password if provided
    const hashedPass = await bcrypt.hash(req.body.password, 10);

    // Update the user's profile, including the new password
    const result = await User.update(
      { ...req.body, password: hashedPass },
      { where: { id: req.locals } }
    );

    if (!result[0]) { // result[0] indicates the number of rows affected
      return res.status(500).send("Unable to update user");
    }

    return res.status(200).send("User updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to update user");
  }
};

const deleteuser = async (req, res) => {
  try {
    const { userId } = req.body;

    // Delete the user by their ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Delete associated Doctor record (if exists)
    const doctor = await Doctor.findOne({ where: { userId } });
    if (doctor) {
      await doctor.destroy();
    }

    // Delete associated appointments (if exists)
    const appointments = await Appointment.findAll({ where: { userId } });
    for (const appointment of appointments) {
      await appointment.destroy();
    }

    // Delete the user
    await user.destroy();

    return res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
};
