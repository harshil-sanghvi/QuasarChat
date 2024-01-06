const { addMessage, getMessages } = require("../controllers/messageController");
const express = require("express");
const router = express.Router();

// Routes for message operations

/**
 * Route to add a new message.
 * POST /api/messages/addmsg
 */
router.post("/addmsg", addMessage);

/**
 * Route to get messages between two users.
 * POST /api/messages/getmsg
 */
router.post("/getmsg", getMessages);

module.exports = router;