import React, { useEffect, useState } from "react";
import { getAppointments } from "../services/doctorService";
import toast from "react-hot-toast";
import { useTheme } from "../middleware/ThemeContext"; // Assuming we have a ThemeContext


const DoctorDashboard = () => {
  const [appointmentData, setAppointmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useTheme(); 

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments(); // Remove token; no need to pass it explicitly
      console.log("Fetched appointments:", data); // Log fetched data
      setAppointmentData(data);
    } catch (err) {
      console.error("Error fetching appointments:", err); // Log error
      toast.error(err); // Display error notification
      setError(err.message || "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setAppointmentData((prev) =>
        prev.map((appointment) =>
          appointment.id === id ? { ...appointment, status } : appointment
        )
      );
      toast.success(`Appointment ${status}`); // Show success notification
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside
  className={`w-64 text-white flex flex-col justify-between transition-all ${
    theme === "dark" ? "bg-gray-800" : "bg-indigo-600"
  }`}
>
  <div className="p-6">
    <h2 className="text-2xl font-semibold mb-6">Doctor Dashboard</h2>
    <nav>
      <ul>
        <li className="mb-4">
          <a
            href="#"
            className="block px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setActiveTab("home")}
          >
            Home
          </a>
        </li>
        <li className="mb-4">
          <a
            href="#"
            className="block px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setActiveTab("appointments")}
          >
            Appointments
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setActiveTab("inbox")}
          >
            Inbox
          </a>
        </li>
      </ul>
    </nav>
  </div>
  <footer className="p-6">
    <p className="text-sm">© 2024 Doctor Portal</p>
  </footer>
</aside>


      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Appointments</h2>
        {appointmentData.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Patient Name</th>
                  <th className="px-4 py-2 text-left">Reason</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointmentData.map((appointment) => (
                  <tr key={appointment.id} className="border-b hover:bg-gray-100">
                    <td className="px-4 py-2">{appointment.User.firstname + " " + appointment.User.lastname}</td>
                    <td className="px-4 py-2">{appointment.reason}</td>
                    <td className="px-4 py-2">{appointment.date}</td>
                    <td className="px-4 py-2">{appointment.time}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          appointment.status === "Pending"
                            ? "bg-yellow-400 text-yellow-800"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleStatusChange(appointment.id, "Accepted")}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, "Rejected")}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;
