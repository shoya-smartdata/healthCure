import React from "react";
import { Navigate } from "react-router-dom";

// Simulate authentication state (replace with actual authentication logic)
const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Replace with your auth logic
  return { isAuthenticated: !!user, user };
};

const Public = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Public;
