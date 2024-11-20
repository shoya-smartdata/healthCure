import React, { useEffect, useState } from "react";
import { fetchallAppointments } from "../services/userService";
// Adjust path as needed

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await fetchallAppointments(); // Fetch all appointments
        setAppointments(data);
        console.log("hehe",data);
        
      } catch (err) {
        console.error("Error:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Your Appointments
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Manage your appointments here.
      </p>

      {loading ? (
        <p className="text-center">Loading appointments...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : appointments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Appointment Details */}
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                Appointment with Dr. {appointment.User.firstname}{" "}
                {appointment.User.lastname}
              </h2>
              <p className="text-gray-600">
                <strong>Date:</strong> {appointment.date}
              </p>
              <p className="text-gray-600">
                <strong>Time Slot:</strong> {appointment.time}
              </p>
              <p
                className={`mt-2 text-sm font-medium ${
                  appointment.status === "approved"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                Status: {appointment.status}
              </p>

              {/* Button */}
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No appointments found.</p>
      )}
    </div>
  );
};

export default Appointments;
