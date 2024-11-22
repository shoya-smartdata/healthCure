import React from "react";
import { useAuth } from "../middleware/AuthContext";

const Footer = () => {
  const { user } = useAuth();
  console.log("ypooo", user);
  
  return (
    <footer className="bg-indigo-600 text-white text-center py-4 ">
      © 2024 Your Healthcare App. All rights reserved.
    </footer>
  );
};

export default Footer;