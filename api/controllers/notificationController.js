const Notification = require("../models/notificationModel");

const getallnotifs = async (req, res) => {
  try {
    // Get notifications for the logged-in user (assuming userId is stored in req.locals)
    const notifs = await Notification.findAll({
      where: { userId: req.locals },
    });

    return res.status(200).json(notifs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to get all notifications");
  }
};

module.exports = {
  getallnotifs
};
