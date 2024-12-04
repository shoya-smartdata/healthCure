import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Doctor = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.isDoctor !== true) {
    return <Navigate to="/error" replace />; // Redirect if not authenticated or not a doctor
  }

  return children; // Render children (doctor content) if authenticated and is doctor
};

export default Doctor;
