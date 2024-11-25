import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useTheme } from "../middleware/ThemeContext";

const Layout = () => {
  const theme = useTheme(); // Correctly calling the hook
  return (
    <>
      <Navbar />
      <main
        className={`min-h-[calc(100vh-64px-64px)] mt-16  
        ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
