import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/doctors" className="hover:underline">Doctors</Link>
        <Link to="/appointments" className="hover:underline">Appointments</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
