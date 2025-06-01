// Import bcrypt for password hashing and comparison
const bcrypt = require("bcryptjs");

// Import the User model from the models folder
const User = require("../models/User");

// Import the JWT token generator utility function
const generateToken = require("../utils/generateToken");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    // Extract user input from request body
    const { name, email, password } = req.body;

    // Check if any required field is missing
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // If user creation is successful, send back user info with JWT token
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id), // sign JWT with user ID
      });
    } else {
      // If user creation failed
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    // Catch any server-side errors
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Authenticate user and return token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if any field is missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If no user found with given email
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // If login is successful, return user info and token
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    // Catch server-side errors
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Get logged-in user's profile
 * @route   GET /api/auth/profile
 * @access  Private (Requires valid JWT)
 */
const getProfile = async (req, res) => {
  try {
    // `req.user` is set by the protect middleware after verifying JWT
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Fetch user details by ID, excluding password
    const user = await User.findById(req.user._id).select("-password");

    // If user not found in DB
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user profile info
    return res.json(user);
  } catch (error) {
    // Handle server-side errors
    console.error("Error in getProfile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Export all controller functions for use in routes
module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
