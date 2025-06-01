const Task = require("../models/Task");

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;
    const newTask = new Task({ title, description, completed });
    await newTask.save();
    res.status(201).json(newTask); // 201 Created
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};
