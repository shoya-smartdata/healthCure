import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import useAuth hook

const Protected = ({ children }) => {
  const { user } = useAuth(); // Access the user from context

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children; // Render protected content if authenticated
};

export default Protected;
