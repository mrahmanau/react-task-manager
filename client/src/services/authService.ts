import axios from "axios";

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
  console.log(response);
  return response.data;
};
