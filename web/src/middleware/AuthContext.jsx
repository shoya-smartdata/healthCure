import React, { createContext, useContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // Corrected the import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   console.log("AuthProvider useEffect triggered");
  //   const storedToken = localStorage.getItem("token");
  
  //   if (storedToken) {
  //     try {
  //       const decodedUser = jwtDecode(storedToken);
  //       console.log("Decoded User in useEffect:", decodedUser);
  
  //       setUser(decodedUser);
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   }
  // }, []);
  
  //
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded User:", decodedUser); 
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  
  const login = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      console.log(decodedUser, "decodede token   velue ");
      
      localStorage.setItem("token", token); // Store token
      localStorage.setItem("userRole", JSON.stringify({ isAdmin: decodedUser.isAdmin, isDoctor: decodedUser.isDoctor })); // Store roles
      setUser(decodedUser);
      
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
