import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h2>
      <p className="text-gray-600 text-lg mb-6 text-center">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <NavLink
        to="/"
        className="px-6 py-3 bg-indigo-600 text-white text-lg font-medium rounded-md hover:bg-indigo-700 transition duration-300"
      >
        Go to Home
      </NavLink>
    </div>
  );
};

export default Error;
