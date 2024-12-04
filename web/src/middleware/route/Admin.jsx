import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Admin = ({ children }) => {
  const { user } = useAuth();

  console.log("Current User:", user);

  // Check if the user exists and has admin privileges
  if (!user || !user.isAdmin) {
    return <Navigate to="/error" replace />;
  }

  return children; // Render children (admin content) if authenticated as admin
};

export default Admin;

