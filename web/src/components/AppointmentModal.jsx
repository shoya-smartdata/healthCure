import React, { useState, useEffect } from "react";
import { bookappointment } from "../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../middleware/ThemeContext";

const AppointmentModal = ({ doctor, onClose, onBook }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // Access current theme

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to book an appointment.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await bookappointment({
        date,
        time,
        doctorId: doctor.User.id,
        userId: doctor.User.userId,
      });
      toast.success("Appointment booked!");
      navigate("/appointments");
      onBook(); // Trigger parent callback
    } catch (error) {
      console.error("Error response details:", error.response || error.message);
      toast.error(error?.response?.data?.message || "Unable to book appointment.");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900 bg-opacity-70" : "bg-gray-900 bg-opacity-50"
      } z-50`}
    >
      <div
        className={`p-6 rounded-lg shadow-lg w-96 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">
          Book Appointment with Dr. {doctor.User.firstname} {doctor.User.lastname}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block text-sm font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-4 py-2 mt-2 border rounded-lg ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block text-sm font-semibold ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full px-4 py-2 mt-2 border rounded-lg ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-gray-600 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme === "dark"
                  ? "bg-teal-600 text-gray-100 hover:bg-teal-700"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
