import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function ApplyDoctor() {
  const [formDetails, setFormDetails] = useState({
    specialization: "",
    experience: "",
    fees: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

// Install this package if not done yet: npm install jwt-decode

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { specialization, experience, fees } = formDetails;
  
    // Input validation
    if (!specialization || !experience || !fees) {
      toast.error("Please fill all the fields.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to apply.");
        return;
      }
  
      // Decode the token to extract userId
      const decoded = jwtDecode(token);
      const userId = decoded.userId; 
  
      await axios.post(
        `http://localhost:3030/api/doctor/applyfordoctor/${userId}`,
        {
          specialization,
          experience,
          fees,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );
  
      toast.success("Application submitted successfully!");
      setFormDetails({
        specialization: "",
        experience: "",
        fees: "",
      });
    } catch (error) {
      console.error("Error submitting application:", error.response || error.message);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Apply For Doctor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="specialization"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your specialization"
            value={formDetails.specialization}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="experience"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your experience in years"
            value={formDetails.experience}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fees"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your consultation fees (in rupees)"
            value={formDetails.fees}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Apply
          </button>
        </form>
      </div>
    </section>
  );
}

export default ApplyDoctor;
