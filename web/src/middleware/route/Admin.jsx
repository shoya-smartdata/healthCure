import React from "react";
import { Navigate } from "react-router-dom";

// Simulate authentication state (replace with actual authentication logic)
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Replace with your auth logic
  return { isAuthenticated: !!user, user };
};

const Admin = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user.role !== "admin") {
    return <Navigate to="/error" replace />;
  }

  return children;
};

export default Admin;
