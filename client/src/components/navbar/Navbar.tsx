import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css"; // Import optional custom styles

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Simulated logged-in state (replace with real auth logic later)
  const isLoggedIn = Boolean(localStorage.getItem("token")); // true if token exists
  const userName = localStorage.getItem("name") || "User";

  // Handler for logout button
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className="navbar bg-primary p-3 d-flex justify-content-between align-items-center">
      {/* Brand / Logo */}
      <div className="navbar-brand text-white fs-4 fw-bold">
        <Link to="/" className="text-white text-decoration-none">
          TaskMaster
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="nav-links d-flex gap-3">
        <Link to="/" className="text-white text-decoration-none">
          Home
        </Link>

        {/* Show Tasks link only if logged in */}
        {isLoggedIn && (
          <Link to="/tasks" className="text-white text-decoration-none">
            Tasks
          </Link>
        )}

        {/* Conditional rendering based on login */}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="text-white text-decoration-none">
              Login
            </Link>
            <Link to="/register" className="text-white text-decoration-none">
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-white">Hello, {userName}</span>
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
              type="button"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
