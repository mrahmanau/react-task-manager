const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   GET /api/auth/profile
 * @desc    Get the current user's profile
 * @access  Private (Requires JWT)
 */
router.get("/profile", protect, getProfile);

module.exports = router;
