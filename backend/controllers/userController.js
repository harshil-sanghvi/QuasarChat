const User = require("../models/userModel");
const bcrypt = require("bcrypt");

/**
 * Controller function for user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // Remove password before sending the response
    delete user.password;

    // Send success response with user data
    return res.json({ status: true, user });
  } catch (ex) {
    // Pass the error to the next middleware
    next(ex);
  }
};

/**
 * Controller function for user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if username is already in use
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });

    // Check if email is already in use
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // Remove password before sending the response
    delete user.password;

    // Send success response with user data
    return res.json({ status: true, user });
  } catch (ex) {
    // Pass the error to the next middleware
    next(ex);
  }
};

/**
 * Controller function to get all users except the one with the specified ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.getAllUsers = async (req, res, next) => {
  try {
    // Retrieve all users except the one with the specified ID
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);

    // Send the list of users as the response
    return res.json(users);
  } catch (ex) {
    // Pass the error to the next middleware
    next(ex);
  }
};

/**
 * Controller function to set a user's avatar image.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // Update user data with the new avatar image
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );

    // Send response with updated avatar information
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    // Pass the error to the next middleware
    next(ex);
  }
};

/**
 * Controller function for user logout.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
module.exports.logOut = (req, res, next) => {
  try {
    // Check if user id is provided
    if (!req.params.id)
      return res.json({ msg: "User id is required" });

    // Remove the user from the online users collection
    onlineUsers.delete(req.params.id);

    // Send success response
    return res.status(200).send();
  } catch (ex) {
    // Pass the error to the next middleware
    next(ex);
  }
};