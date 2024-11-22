import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState({ isAdmin: false, isDoctor: false });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { isAdmin, isDoctor } = jwtDecode(token);
        setIsLoggedIn(true);
        setUserRole({ isAdmin, isDoctor });
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole({ isAdmin: false, isDoctor: false });
    navigate("/login");
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/doctors", label: "Doctors" },
    { path: "/appointments", label: "Appointments", auth: true },
    { path: "/profile", label: "Profile", auth: true },
    { path: "/applyfordoctor", label: "Apply as Doctor", auth: true },
  ];

  return (
    <nav
      className="bg-indigo-600 text-white py-4 px-6 flex justify-between drop-shadow-lg fixed w-full top-0 left-0 items-center"
      aria-label="Primary Navigation"
    >
      <div className="flex gap-4 text-sm sm:text-base">
        {links
          .filter((link) => (link.auth ? isLoggedIn : true))
          .map(({ path, label }) => (
            <Link key={path} to={path} className="hover:underline">
              {label}
            </Link>
          ))}
      </div>

      <div className="flex gap-4 text-sm sm:text-base">
        {isLoggedIn ? (
          <>
            <button
              onClick={handleLogout}
              className="hover:underline px-4 py-2 bg-white text-red-600 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
            {userRole.isAdmin && (
              <Link
                to="/dashboard/admin"
                className="hover:underline px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
              >
                Admin Dashboard
              </Link>
            )}
            {userRole.isDoctor && !userRole.isAdmin && (
              <Link
                to="/dashboard/doctor"
                className="hover:underline px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
              >
                Doctor Dashboard
              </Link>
            )}
          </>
        ) : (
          <Link
            to="/login"
            className="hover:underline px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
