import React, { useState, useEffect } from "react";
import { FaUserAlt, FaStethoscope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getalldoctorsreq, acceptDoctor, sendRejectDoctorRequest, getalldoctors } from "../services/doctorService";
import toast from "react-hot-toast";

const Dashboard = () => {
  // State to handle doctor application data
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorApplications = async () => {
      try {
        const data = await getalldoctorsreq();
          console.log(data, "validate")
        setApplications(data);
      } catch (error) {
        console.error("Error fetching doctor applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorApplications();
  }, []);

  // Function to accept a doctor application
  const handleAcceptDoctorApplication = async (id) => {
    try {
      await acceptDoctor(id);
      toast.success("Doctor request accepted!");
      // Update the status of the accepted application in the UI
      setApplications((prev) =>
        prev.map((app) =>
          app.User.id === id ? { ...app, User: { ...app.User, status: "accepted" } } : app
        )
      );
    } catch (error) {
      console.error("Error accepting doctor application:", error);
      toast.error("Failed to accept doctor request.");
    }
  };

  // Function to reject a doctor application
  const handleRejectDoctorApplication = async (id) => {
    try {
      await sendRejectDoctorRequest(id);
      toast.success("Doctor request canceled!");
      // Remove the rejected application from the UI
      setApplications((prev) => prev.filter((app) => app.User.id !== id));
    } catch (error) {
      console.error("Unable to reject doctor request:", error);
      toast.error("Failed to reject doctor request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white p-6 space-y-8">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-lg hover:bg-blue-700 p-3 rounded">
            Dashboard
          </a>
          <a href="#" className="block text-lg hover:bg-blue-700 p-3 rounded">
            Doctor Applications
          </a>
          <a href="#" className="block text-lg hover:bg-blue-700 p-3 rounded">
            User Data
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Doctor Applications Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Doctor Applications
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {loading ? (
              <p className="text-gray-500 text-lg">Loading applications...</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-500 text-lg">No applications to review.</p>
            ) : (
              applications.map((application) => (
                <div
                  key={application.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <FaUserAlt className="text-4xl text-blue-600" />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {application.User.firstname} {application.User.lastname}
                      </h3>
                      <p className="text-lg text-gray-600">
                        {application.specialization}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Status: {application.User.status}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Experience: {application.experience} years
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Fees: ₹{application.fees}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Mobile: {application.User.mobile}
                  </div>
                  <div className="text-sm text-gray-500 mb-4">
                    Email: {application.User.email}
                  </div>
                  <div className="flex space-x-4">
                    {application.User.status === "pending" ? (
                      <>
                        <button
                          onClick={() =>
                            handleAcceptDoctorApplication(application.User.id)
                          }
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center space-x-2"
                        >
                          <FaCheckCircle />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() =>
                            handleRejectDoctorApplication(application.User.id)
                          }
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 flex items-center space-x-2"
                        >
                          <FaTimesCircle />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-green-600 font-medium">
                        Accepted
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* User Data Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            User Data
          </h2>
          <div className="overflow-hidden bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-gray-700">Username</th>
                  <th className="py-3 px-6 text-left text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr
                    key={application.User.id}
                    className="border-b hover:bg-gray-50 transition duration-300"
                  >
                    <td className="py-3 px-6 text-gray-800">
                      {application.User.firstname} {application.User.lastname}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {application.User.email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
