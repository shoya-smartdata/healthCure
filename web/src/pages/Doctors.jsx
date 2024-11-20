import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getalldoctors } from "../services/doctorService";
import AppointmentModal from "../components/AppointmentModal"; // Import the modal component

const Doctors = () => {
  const [doctors, setDoctors] = useState([]); // Placeholder for fetched data
  const [loading, setLoading] = useState(false); // Local loading state
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to track the selected doctor
  const [showModal, setShowModal] = useState(false); // State to toggle the modal

  useEffect(() => {
    // Fetching doctors data when the component mounts
    const fetchAllDocs = async () => {
      setLoading(true); // Set loading to true before making API call
      try {
        const doctorsData = await getalldoctors();
        console.log(doctorsData);
        setDoctors(doctorsData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false); // Set loading to false after the API call
      }
    };

    fetchAllDocs();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleBookAppointment = (doctorId, doctorname, date, time) => {
    // Handle booking logic here (API call, etc.)
    console.log(`Appointment booked with Dr. ${doctorname} on ${date} at ${time}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {loading && <Loading />} {/* Show loading spinner while data is fetching */}
      {!loading && (
        <section>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Our Doctors
          </h2>
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Profile Picture */}
                  <img
                    src={doctor.User.pic}
                    alt={`${doctor.User.firstname} ${doctor.User.lastname}`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-indigo-600"
                  />
                  {/* Doctor's Full Name */}
                  <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                    {doctor.User.firstname} {doctor.User.lastname}
                  </h3>
                  {/* Specialization */}
                  <p className="text-gray-600 mb-2">{doctor.specialization}</p>
                  {/* Experience */}
                  <p className="text-gray-600 mb-2">
                    <strong>Experience:</strong> {doctor.experience} years
                  </p>
                  {/* Fees */}
                  <p className="text-gray-600 mb-2">
                    <strong>Fees:</strong> ₹{doctor.fees}
                  </p>
                  {/* Status */}
                  <p
                    className={`text-sm font-medium ${
                      doctor.status === "approved" ? "text-green-500" : "text-yellow-400"
                    }`}
                  >
                    {doctor.status === "approved" ? "Approved" : "Pending"}
                  </p>
                  {/* Book Appointment Button */}
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor); // Set selected doctor
                      setShowModal(true); // Show the modal
                    }}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No data available!</p> // Message when no doctors are available
          )}
        </section>
      )}

      {/* Modal for Booking Appointment */}
      {showModal && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setShowModal(false)}
          onBook={handleBookAppointment}
        />
      )}
    </div>
  );
};

export default Doctors;
