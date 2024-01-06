const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

// Middleware setup
app.use(cors(
  {
    origin: ["https://quasar-chat-backend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
  }
));
app.use(express.json());

// Database connection setup
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// API routes setup
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Server setup
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);

// Socket.io setup
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// Global map to store online users and their socket IDs
global.onlineUsers = new Map();

// Socket.io connection event
io.on("connection", (socket) => {
  global.chatSocket = socket;
  // Event to add a user to the online users map
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // Event to send a message
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
