const jwt = require("jsonwebtoken"); // Import jsonwebtoken package to verify JWT tokens
const asyncHandler = require("express-async-handler"); // Helper to handle async errors in Express routes

// Middleware function to protect routes by verifying JWT token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token string from header "Bearer <token>"
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach decoded payload (e.g. user ID) to request object for downstream use
      req.user = decoded;

      // Call next middleware or route handler since token is valid
      next();
    } catch (error) {
      // If token verification fails, log the error
      console.error("Token verification failed:", error);

      // Respond with 401 Unauthorized status
      res.status(401);

      // Throw error to be caught by error handling middleware
      throw new Error("Not authorized, token failed");
    }
  }

  // If no token was found in Authorization header, respond with 401 Unauthorized
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect }; // Export the middleware function for use in route protection
