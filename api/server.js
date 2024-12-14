const { createServer } = require('node:http');
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./models");
const userRouter = require("./routes/userRoute");
const doctorRouter = require("./routes/doctorRoute");
const appointRouter = require("./routes/appointRoutes");
const notificationRouter = require("./routes/notificationRoute");
const messageRoute = require('./routes/messageRoutes');
const initSocketServer = require("./sockets/socketServer");

const app = express();
const server = createServer(app); // Create HTTP server instance for Socket.IO
const io = initSocketServer(server); // Initialize the Socket.IO server

const port = process.env.PORT || 5000;

app.use(cors({origin: 'http://localhost:5173' }));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);
app.use('/api/message', messageRoute);
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
