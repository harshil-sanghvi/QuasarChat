const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController");

const express = require("express");
const router = express.Router();

// Routes for user authentication and related operations

/**
 * Route for user login.
 * POST /api/auth/login
 */
router.post("/login", login);

/**
 * Route for user registration.
 * POST /api/auth/register
 */
router.post("/register", register);

/**
 * Route to get all users except the one with the specified ID.
 * GET /api/auth/allusers/:id
 */
router.get("/allusers/:id", getAllUsers);

/**
 * Route to set a user's avatar image.
 * POST /api/auth/setavatar/:id
 */
router.post("/setavatar/:id", setAvatar);

/**
 * Route for user logout.
 * GET /api/auth/logout/:id
 */
router.get("/logout/:id", logOut);

module.exports = router;