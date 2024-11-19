import React from "react";
import { useNavigate } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate();

  // Static doctor data
  const doctors = [
    { id: 1, name: "Dr. John Doe", specialization: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialization: "Dermatologist" },
    { id: 3, name: "Dr. Emily Johnson", specialization: "Pediatrician" },
  ];

  // Handle appointment booking
  const handleBookAppointment = (doctorId) => {
    navigate(`/book-appointment/${doctorId}`); // Redirect to booking page
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 via-blue-200 to-blue-50 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Book an Appointment
      </h1>
      <p className="text-lg text-center text-gray-600 mb-12">
        Select a doctor from our panel of experienced professionals.
      </p>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow transform hover:scale-105"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {doctor.name}
                </h2>
                <div className="text-blue-500 bg-blue-100 px-2 py-1 text-sm font-medium rounded-md">
                  ID: {doctor.id}
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                <span className="font-medium text-gray-600">Specialization:</span>{" "}
                {doctor.specialization}
              </p>
              <button
                onClick={() => handleBookAppointment(doctor.id)}
                className="w-full bg-blue-500 text-white py-3 px-5 rounded-lg font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default BookAppointment;
