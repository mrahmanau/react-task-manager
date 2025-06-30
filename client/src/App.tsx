import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskManager from "./components/TaskManager";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import { ProctectedRoute } from "./routes/private-route";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <Router>
      {/* ✅ ToastContainer should be outside Routes so it appears globally */}
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      {/* Always show Navbar on top */}
      <Navbar />

      {/* Routes for page content */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/tasks"
          element={
            <ProctectedRoute>
              <TaskManager />
            </ProctectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
