import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white py-4 px-6 flex justify-between drop-shadow-lg fixed w-full top-0 left-0 items-center">
      {/* Left Links */}
      <div className="flex drop-shadow-lg gap-4 text-sm sm:text-base">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/doctors" className="hover:underline">
          Doctors
        </Link>
        <Link to="/appointments" className="hover:underline">
          Appointments
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
      </div>
      
      {/* Right Links */}
      <div className="flex gap-4 text-sm sm:text-base">
        <Link
          to="/login"
          className="hover:underline px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="hover:underline px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
