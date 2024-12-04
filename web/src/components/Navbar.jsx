import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../middleware/AuthContext"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"; // Importing icons
import { useTheme } from "../middleware/ThemeContext"; // Assuming we have a ThemeContext

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme(); // theme and toggleTheme from ThemeContext
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track if the menu is open
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleThemeToggle = () => {
    toggleTheme(); // Switch between dark and light theme
  };

  const links = [
    { path: "/", label: "Home" },
    { path: "/doctors", label: "Doctors" },
    { path: "/appointments", label: "Appointments", auth: true, restricted: true },
    { path: "/profile", label: "Profile", auth: true },
    { path: "/applyfordoctor", label: "Apply as Doctor", auth: true, restricted: true },
  ];

  return (
    <nav
      className={`bg-indigo-600 text-white py-4 px-6 flex justify-between drop-shadow-lg fixed w-full top-0 left-0 items-center ${theme === 'dark' ? 'bg-gray-900' : ''}`}
      aria-label="Primary Navigation"
    >
      <div className="flex gap-4 text-sm sm:text-base">
        {links
          .filter((link) =>
            (link.auth ? user : true) &&
            (!link.restricted || (!user?.isAdmin && !user?.isDoctor))
          )
          .map(({ path, label }) => (
            <Link key={path} to={path} className="hover:underline">
              {label}
            </Link>
          ))}
      </div>

      <div className="flex gap-4 text-sm sm:text-base items-center">
        <button
          className="text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu on click
        >
          <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
        </button>

        {/* Menu for logout, theme toggle, and dashboard */}
        {isMenuOpen && (
          <div className="absolute bg-white text-black mt-4 right-6 top-14 py-2 px-4 rounded shadow-md w-48 z-10">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 rounded z-50"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" /> 
                  Logout
                </button>

                {user.isAdmin && (
                  <Link
                    to="/dashboard/admin"
                    className="w-full flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 rounded"
                  >
                    Admin Dashboard
                  </Link>
                )}
                {user.isDoctor && !user.isAdmin && (
                  <Link
                    to="/dashboard/doctor"
                    className="w-full flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 rounded"
                  >
                    Doctor Dashboard
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 rounded"
              >
                Login
              </Link>
            )}

            {/* Theme toggle button */}
            <button
              onClick={handleThemeToggle}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded mt-2"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faSun : faMoon}
                className="w-5 h-5"
              />
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
