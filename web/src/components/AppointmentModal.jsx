import React, { useState } from "react";
import { bookappointment } from "../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AppointmentModal = ({ doctor, onClose, onBook }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const nevigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with logged-in user's ID if dynamic
      const response = await bookappointment({
        date,
        time,
        doctorId: doctor.User.id, // Pass dynamic doctor ID
        userId: doctor.User.userId
      });
      toast.success("Appointment booked!");
      nevigate('/appointments')
      onBook(); // Trigger parent callback
    } catch (error) {
      console.error("Error response details:", error.response || error.message);
      toast.error(error?.response?.data?.message || "Unable to book appointment.");
    }
  };
  
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Book Appointment with Dr. {doctor.User.firstname} {doctor.User.lastname}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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
