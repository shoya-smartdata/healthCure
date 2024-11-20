import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Ensure you install jwt-decode via npm install jwt-decode

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the stored token from localStorage
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        // Decode the token to extract user information
        const decodedUser = jwtDecode(storedToken);
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token from localStorage:", error);
        localStorage.removeItem("token"); // Clear invalid token
      }
    }
  }, []);

  const login = (token, userData) => {
    try {
      // Decode the token to extract user information
      const decodedUser = jwtDecode(token);

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Update the user state with decoded user data
      setUser({ ...decodedUser, ...userData }); // Combining user data from backend if needed
    } catch (error) {
      console.error("Error decoding login token:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    setUser(null); // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
