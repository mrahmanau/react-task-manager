import { Navigate } from "react-router-dom";
import { getCurrentLoggedInUser } from "../services/authService";
import { JSX } from "react";

/**
 * A component that wraps around protected routes.
 * If the user is not authenticated, they will be redirected to /login.
 */
export const ProctectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = getCurrentLoggedInUser();

  if (!user) {
    // 🚫 User not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // ✅ User is logged in, allow access to the route
  return children;
};
