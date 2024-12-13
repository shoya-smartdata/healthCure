import React, { useEffect, useState } from "react";
import { fetchallAppointments } from "../services/userService";
import Chat from "../components/chat/Chat"; // Import Chat component

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chatVisible, setChatVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await fetchallAppointments();
        setAppointments(data);
        console.log("Fetched appointments: ", data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleChatClick = (appointment) => {
    setSelectedAppointment(appointment);
    setChatVisible(true);
  };

  const closeChat = () => {
    setChatVisible(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-indigo-700 text-center mb-8">
        Your Appointments
      </h1>
      <p className="text-center text-gray-600 mb-8 text-lg">
        Stay on top of your schedule and manage appointments easily.
      </p>

      {loading ? (
        <p className="text-center text-indigo-500 font-medium">
          Loading appointments...
        </p>
      ) : error ? (
        <p className="text-center text-red-500 font-medium">{error}</p>
      ) : appointments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Appointment Details
              </h2>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Date:</span> {appointment.date}
              </p>
              <p className="text-gray-700 mb-2">
                <span className="font-bold">Time Slot:</span> {appointment.time}
              </p>
              <p
                className={`text-sm font-medium mb-4 ${
                  appointment.status === "approved"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                Status: {appointment.status}
              </p>

              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 w-full sm:w-auto">
                  View Details
                </button>

                <button
                  onClick={() => handleChatClick(appointment)}
                  className={`px-4 py-2 rounded-lg w-full sm:w-auto transition duration-300 ${
                    appointment.status === "complete" ||
                    appointment.status === "accept"
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={
                    !(
                      appointment.status === "complete" ||
                      appointment.status === "accept"
                    )
                  }
                >
                  Chat with
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 font-medium">
          No appointments found.
        </p>
      )}

      {chatVisible && selectedAppointment && (
        <Chat
          onClose={closeChat}
          appointment={selectedAppointment}
          receiverId={selectedAppointment.doctorId} // Assuming doctorId is available in appointment
          receiverName={selectedAppointment.doctorName}
        />
      )}
    </div>
  );
};

export default Appointments;
