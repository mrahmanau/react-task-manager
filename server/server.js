// Load environment variables from .env file (like MongoDB URI, PORT, etc.)
require("dotenv").config();

// Import the Express framework to create the server and handle HTTP requests
const express = require("express");

// Import custom database connection function
const connectDB = require("./config/db");

// Import task-related routes
const taskRoutes = require("./routes/taskRoutes");

// Create an instance of an Express app
const app = express();

// Connect to MongoDB using Mongoose (handled in a separate file for clean structure)
connectDB();

// Middleware to automatically parse incoming JSON requests (e.g., from frontend)
app.use(express.json());

// Define a simple GET route for the root path to verify server is running
app.get("/", (req, res) => {
  res.send("🚀 Task Manager API is running...");
});

// Mount all task-related routes under the /tasks URL path
// Example: GET /tasks will call the controller to fetch all tasks
app.use("/tasks", taskRoutes);

// Import custom error-handling middleware (optional but useful for production)
const errorHandler = require("./middlewares/errorHandler");

// Use the error-handling middleware at the end of all route declarations
app.use(errorHandler);

// Set the server port (from .env or default to 5000)
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
