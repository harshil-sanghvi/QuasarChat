const mongoose = require("mongoose");

// Define the schema for messages
const MessageSchema = mongoose.Schema(
  {
    // Message text is required
    message: {
      text: { type: String, required: true },
    },
    // Array of users involved in the message
    users: Array,
    // Reference to the sender user, required
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Create a model named "Message" using the defined schema
const MessageModel = mongoose.model("Message", MessageSchema);

// Export the Message model
module.exports = MessageModel;