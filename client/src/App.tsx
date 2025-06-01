import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./components/TaskManager";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";

function App() {
  return (
    <Router>
      {/* ✅ ToastContainer should be outside Routes so it appears globally */}
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
    </Router>
  );
}

export default App;
