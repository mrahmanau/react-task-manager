const express = require("express");
const Task = require("../models/Task");

// Create a router
const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    // Fetch all tasks from MongoDB
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
});

// Export the router for use in server.js
module.exports = router;
