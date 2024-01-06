const Messages = require("../models/messageModel");

/**
 * Controller function to get messages between two users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.getMessages = async (req, res, next) => {
  try {
    // Destructure 'from' and 'to' from request body
    const { from, to } = req.body;

    // Retrieve messages from the database for the specified users, sorted by updatedAt
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    // Project relevant information for the response
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    // Respond with the projected messages
    res.json(projectedMessages);
  } catch (ex) {
    // Pass the error to the next middleware
    next(ex);
  }
};

/**
 * Controller function to add a new message.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.addMessage = async (req, res, next) => {
  try {
    // Destructure 'from', 'to', and 'message' from request body
    const { from, to, message } = req.body;

    // Create a new message in the database
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // Check if the message was added successfully and respond accordingly
    if (data) {
      res.json({ msg: "Message added successfully." });
    } else {
      res.json({ msg: "Failed to add message to the database" });
    }
  } catch (ex) {
    // Pass the error to the next middleware
    next(ex);
  }
};