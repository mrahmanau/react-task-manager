const Task = require("../models/Task");

// ✅ Get only the tasks that belong to the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).sort({ createdAt: -1 }); // latest first
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

// ✅ Create a new task, associating it with the logged-in user
exports.createTask = async (req, res) => {
  try {
    const { title, description, completed = false } = req.body;

    // Attach the user ID from the JWT token to the task
    const newTask = new Task({
      title,
      description,
      completed,
      user: req.user.id, // ✅ set the owner of the task
    });

    // Save the task to the database
    await newTask.save();

    // Return the created task with a 201 status
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};
