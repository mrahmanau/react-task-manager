// Load environment variables from .env file (like MongoDB URI, PORT, etc.)
require("dotenv").config();

// Import the Express framework to create the server and handle HTTP requests
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Import custom database connection function
const connectDB = require("./config/db");

// Import routes
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Import custom error-handling middleware (optional but useful for production)
const errorHandler = require("./middlewares/errorHandler");

// Create an instance of an Express app
const app = express();

// Connect to MongoDB using Mongoose (handled in a separate file for clean structure)
connectDB();

// Middleware to automatically parse incoming JSON requests (e.g., from frontend)
app.use(cors());
app.use(express.json());

// Logging in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Define a simple GET route for the root path to verify server is running
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running...");
});

// Mount all task-related routes under the /tasks URL path
// Example: GET /tasks will call the controller to fetch all tasks
app.use("/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Use the error-handling middleware at the end of all route declarations
app.use(errorHandler);

// Set the server port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
