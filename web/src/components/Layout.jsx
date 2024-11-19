import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px-64px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
