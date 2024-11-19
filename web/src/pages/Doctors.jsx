import React, { useEffect, useState } from "react";

import Loading from "../components/Loading";


const Doctors = () => {
  const [doctors, setDoctors] = useState([]); // Placeholder for fetched data
  const [loading, setLoading] = useState(false); // Local loading state

  useEffect(() => {
    // Placeholder fetch logic
    const fetchAllDocs = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setDoctors([
          { id: "1", name: "Dr. John Doe", specialty: "Dermatologist" },
          { id: "2", name: "Dr. Jane Smith", specialty: "Cardiologist" },
          { id: "3", name: "Dr. Alice Brown", specialty: "Neurologist" },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchAllDocs();
  }, []);

  return (
    <>
   
      <div className="container mx-auto px-4 py-8">
        {loading && <Loading />}
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {doctor.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{doctor.specialty}</p>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                      Book Appointment
                    </button>
                  </div>
                ))}
              </div>
            ) : (
             <p>no data  avialable ! </p>
            )}
          </section>
        )}
      </div>
  
    </>
  );
};

export default Doctors;
