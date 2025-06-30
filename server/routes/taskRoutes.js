const express = require("express");
const { getTasks, createTask } = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// ✅ Protect both routes
router.get("/", protect, getTasks); // Only logged-in users can fetch their tasks
router.post("/", protect, createTask); // Only logged-in users can create tasks

module.exports = router;
