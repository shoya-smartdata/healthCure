const express = require("express");
const  {getChatHistory}  = require("../controllers/mesageController");

const messageRoute = express.Router();

messageRoute.get("/chat/:roomId", getChatHistory);

module.exports = messageRoute;
