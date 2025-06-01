import axios from "axios";

export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

// GET all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get("api/tasks");
  return response.data;
};

// POST a new task
export const createTask = async (title: string, description: string) => {
  try {
    console.log("I am going to create a new task");
    const response = await axios.post("api/tasks", {
      title,
      description,
      completed: false,
    });
    console.log("checking the response", response);
    console.log("checking the response data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
