import axios from "axios";

// Base API URL for authentication
const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// ✅ Login User
export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  // Save the user data to localStorage so it persists after reload
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("user");
};

// Get current logged-in user
export const getCurrentLoggedInUser = () => {
  const userStr = localStorage.getItem("user");

  if (userStr) {
    return JSON.parse(userStr); // return object { name, email, token, _id }
  }

  return null;
};

// Get token only (for interceptor)
export const getAuthToken = () => {
  const user = getCurrentLoggedInUser();
  return user?.token || null;
};
