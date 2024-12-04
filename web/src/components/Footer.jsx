import React from "react";

import { useTheme } from "../middleware/ThemeContext"; // Import theme context

const Footer = () => {

  const { theme } = useTheme(); 

  return (
    <footer
      className={`py-6 text-center ${
        theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-indigo-600 text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        

        {/* Footer Content */}
        <p className="text-sm">
          © {new Date().getFullYear()} Your Healthcare App. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              theme === "dark" ? "text-blue-400" : "text-blue-200"
            }`}
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              theme === "dark" ? "text-blue-400" : "text-blue-200"
            }`}
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline ${
              theme === "dark" ? "text-blue-400" : "text-blue-200"
            }`}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
