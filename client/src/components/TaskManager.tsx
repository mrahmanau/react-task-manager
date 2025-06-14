import React, { useEffect, useState } from "react";
import { getTasks, createTask, Task } from "../services/taskService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TaskManager.css";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch the tasks from the backend
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("Failed to fetch tasks.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(title, description);
      setTitle("");
      setDescription("");
      toast.success("Task added successfully!");
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-manager">
      <h2>📝 Task Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong>: {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
