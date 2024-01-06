const mongoose = require("mongoose");

// Define the schema for users
const userSchema = new mongoose.Schema({
  // Username is required, with length constraints and uniqueness
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
  },
  // Email is required, with uniqueness and length constraints
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 50,
  },
  // Password is required, with a minimum length
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  // Flag indicating whether an avatar image is set, defaults to false
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  // Path to the avatar image, defaults to an empty string
  avatarImage: {
    type: String,
    default: "",
  },
});

// Create a model named "User" using the defined schema
const UserModel = mongoose.model("User", userSchema);

// Export the User model
module.exports = UserModel;