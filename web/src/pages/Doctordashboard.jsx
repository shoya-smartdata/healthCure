import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./custom-gallery.css"; // Add custom CSS

const appointments = [
  {
    id: 1,
    patientName: "John Doe",
    reason: "Routine Checkup",
    date: "2024-11-23",
    time: "10:00 AM",
    status: "Pending",
    images: [
      {
        original: "https://picsum.photos/600/400?random=1",
        thumbnail: "https://picsum.photos/100/100?random=1",
      },
      {
        original: "https://picsum.photos/600/400?random=2",
        thumbnail: "https://picsum.photos/100/100?random=2",
      },
      {
        original: "https://picsum.photos/600/400?random=3",
        thumbnail: "https://picsum.photos/100/100?random=3",
      },
    ],
  },
  {
    id: 2,
    patientName: "Jane Smith",
    reason: "Skin Allergy",
    date: "2024-11-24",
    time: "12:00 PM",
    status: "Accepted",
    images: [
      {
        original: "https://picsum.photos/600/400?random=4",
        thumbnail: "https://picsum.photos/100/100?random=4",
      },
      {
        original: "https://picsum.photos/600/400?random=5",
        thumbnail: "https://picsum.photos/100/100?random=5",
      },
      {
        original: "https://picsum.photos/600/400?random=6",
        thumbnail: "https://picsum.photos/100/100?random=6",
      },
    ],
  },
];

const DoctorDashboard = () => {
  const [appointmentData, setAppointmentData] = useState(appointments);

  const handleStatusChange = (id, status) => {
    setAppointmentData((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white flex flex-col justify-between">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Doctor Dashboard</h2>
          <nav>
            <ul>
              <li className="mb-4">
                <a href="#" className="block px-4 py-2 rounded hover:bg-blue-700">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 rounded hover:bg-blue-700">
                  Appointments
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {appointmentData.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex hover:shadow-xl transition-shadow"
            >
              {/* Left: Details */}
              <div className="w-1/2 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {appointment.patientName}
                </h3>
                <p className="text-gray-600">
                  <strong>Reason:</strong> {appointment.reason}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {appointment.date}
                </p>
                <p className="text-gray-600">
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p className="mt-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === "Pending"
                        ? "bg-yellow-400 text-yellow-800"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {appointment.status}
                  </span>
                </p>
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => handleStatusChange(appointment.id, "Accepted")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusChange(appointment.id, "Rejected")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* Right: Image Gallery */}
              <div className="w-1/2">
                <ImageGallery
                  items={appointment.images}
                  showPlayButton={false} // Remove play button
                  showFullscreenButton={true} // Allow full-screen
                  additionalClass="custom-gallery" // Add custom class
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
