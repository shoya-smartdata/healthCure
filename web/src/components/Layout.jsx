import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className=" bg-gray-100  min-h-[calc(100vh-64px-64px)] mt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
