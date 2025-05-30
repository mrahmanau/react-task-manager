// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const taskRoutes = require("./routes/tasks");

// Create an instance of an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Retrieve the MongoDB connection string from .env
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected Successfully."))
  .catch((error) => console.error("MongoDB Connection Error:", error));

app.get("/add-task", async (req, res) => {
  try {
    const newTask = new Task({
      title: "Learn React",
      description: "Build a task tracker",
    });

    const newTask1 = new Task({
      title: "Build Angular Application",
      description: "BDWebtutor is an application built using Angular.",
    });

    // Save the task to MongoDB
    await newTask.save();
    await newTask1.save();
    res.send("✅ Task added successfully.");
  } catch (error) {
    res.status(500).send("❌ Error adding a new task." + error.message);
  }
});

// Define a basic route to check if the server is running
app.get("/", (req, res) => {
  res.send("Server is up and running");
});

// Use routes under /tasks endpoint
app.use("/tasks", taskRoutes);

// Start the server and listen on a defined port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
