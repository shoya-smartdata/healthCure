import React, { useState } from 'react';
import { FaUserAlt, FaStethoscope, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Dashboard = () => {
  // Static Data for Doctor Applications
  const doctorApplications = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', status: 'Pending' },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Dermatologist', status: 'Pending' },
    { id: 3, name: 'Dr. Adam Brown', specialization: 'Neurologist', status: 'Pending' },
  ];

  // Static Data for Users
  const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com' },
    { id: 3, username: 'adam_brown', email: 'adam@example.com' },
  ];

  // State to handle doctor application acceptance/rejection
  const [applications, setApplications] = useState(doctorApplications);

  // Function to accept a doctor application
  const acceptApplication = (id) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === id ? { ...app, status: 'Accepted' } : app
      )
    );
  };

  // Function to reject a doctor application
  const rejectApplication = (id) => {
    setApplications((prevApplications) =>
      prevApplications.filter((app) => app.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white p-6 space-y-8">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        <nav className="space-y-4">
          <a href="#" className="block text-lg hover:bg-blue-700 p-3 rounded">Dashboard</a>
          <a href="#" className="block text-lg hover:bg-blue-700 p-3 rounded">Doctor Applications</a>
          <a href="#" className="block text-lg hover:bg-blue-700 p-3 rounded">User Data</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
      

        {/* Doctor Applications Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Doctor Applications</h2>
          <div className="grid grid-cols-3 gap-6">
            {applications.length === 0 ? (
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
                      <h3 className="text-2xl font-semibold text-gray-800">{application.name}</h3>
                      <p className="text-lg text-gray-600">{application.specialization}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-4">Status: {application.status}</div>
                  <div className="flex space-x-4">
                    {application.status === 'Pending' ? (
                      <>
                        <button
                          onClick={() => acceptApplication(application.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300 flex items-center space-x-2"
                        >
                          <FaCheckCircle />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => rejectApplication(application.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 flex items-center space-x-2"
                        >
                          <FaTimesCircle />
                          <span>Reject</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-green-600 font-medium">Accepted</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* User Data Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Data</h2>
          <div className="overflow-hidden bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-gray-700">Username</th>
                  <th className="py-3 px-6 text-left text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition duration-300">
                    <td className="py-3 px-6 text-gray-800">{user.username}</td>
                    <td className="py-3 px-6 text-gray-800">{user.email}</td>
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
