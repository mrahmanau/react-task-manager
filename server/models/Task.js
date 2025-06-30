const mongoose = require("mongoose");

// Define the schema for a Task
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  // Associate task with the user who created it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User", // this links to the User model
  },
});

// Create a Mongoose model based on the schema
const Task = mongoose.model("Task", taskSchema);

// Export the model for use in other files
module.exports = Task;
