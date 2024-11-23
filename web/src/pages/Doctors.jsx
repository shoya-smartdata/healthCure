import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getalldoctors } from "../services/doctorService";
import AppointmentModal from "../components/AppointmentModal";
import { useTheme } from "../middleware/ThemeContext";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { theme } = useTheme(); // Access current theme

  useEffect(() => {
    const fetchAllDocs = async () => {
      setLoading(true);
      try {
        const doctorsData = await getalldoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDocs();
  }, []);

  return (
    <div
      className={`container mx-auto px-4 py-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {loading && <Loading />}
      {!loading && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">
            Our Doctors
          </h2>
          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`shadow-lg rounded-lg p-6 text-center transition-shadow duration-300 ${
                    theme === "dark"
                      ? "bg-gray-800 text-gray-100 hover:shadow-gray-700"
                      : "bg-white text-gray-900 hover:shadow-gray-400"
                  }`}
                >
                  <img
                    src={doctor.User.pic}
                    alt={`${doctor.User.firstname} ${doctor.User.lastname}`}
                    className={`w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 ${
                      theme === "dark" ? "border-teal-400" : "border-indigo-600"
                    }`}
                  />
                  <h3 className="text-2xl font-semibold mb-2">
                    {doctor.User.firstname} {doctor.User.lastname}
                  </h3>
                  <p className="text-sm mb-1">
                    Specialization: {doctor.specialization}
                  </p>
                  <p className="text-sm mb-1">
                    Experience: {doctor.experience} years
                  </p>
                  <p className="text-sm mb-1">
                    Contact: {doctor.contact}
                  </p>
                  <p className="text-sm mb-1">
                    Location: {doctor.location}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setShowModal(true);
                    }}
                    className={`mt-4 px-4 py-2 rounded-lg transition duration-300 ${
                      theme === "dark"
                        ? "bg-teal-600 text-gray-100 hover:bg-teal-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    Book Appointment
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8">
              No doctors are available at the moment.
            </p>
          )}
        </section>
      )}
      {showModal && (
        <AppointmentModal
          doctor={selectedDoctor}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Doctors;
