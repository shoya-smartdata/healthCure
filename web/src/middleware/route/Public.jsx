import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Public = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default Public;
