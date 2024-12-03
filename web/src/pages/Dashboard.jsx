import React, { useState, useEffect } from "react";
import { FaUserAlt, FaStethoscope, FaCheckCircle, FaTimesCircle, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { getalldoctorsreq, acceptDoctor, sendRejectDoctorRequest , getalldoctors

} from "../services/doctorService";
import toast from "react-hot-toast";

const Dashboard = () => {
  // State to handle doctor application data
  const [applications, setApplications] = useState([]);
  const [userData, setUserdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar toggle state
// all doctor  requests here ! 
const fetchDoctorApplications = async () => {
  try {
    const data = await getalldoctorsreq();

    setApplications(data);
  } catch (error) {
    console.error("Error fetching doctor applications:", error);
  } finally {
    setLoading(false);
  }
};



  // Function to accept a doctor application
  const handleAcceptDoctorApplication = async (id) => {
    try {
      await acceptDoctor(id);
      toast.success("Doctor request accepted!");
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
      setApplications((prev) => prev.filter((app) => app.User.id !== id));
    } catch (error) {
      console.error("Unable to reject doctor request:", error);
      toast.error("Failed to reject doctor request.");
    }
  };

  // get all users 
  const handleAllusers = async ()=>{
   try {
       const userData = await getalldoctors();
       setUserdata(userData);
   } catch (error) {
        console.log("an error", error);
        
   }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex ">
      {/* Hamburger Menu */}
      <div className="absolute left-4 z-50">
      <div
  className={`absolute z-50 transition-transform duration-300 ${
    sidebarOpen ? "left-[132px]" : "left-4"
  }`}
>
  <button
    className="text-white bg-indigo-600 p-2 rounded-full focus:outline-none hover:bg-indigo-700 transition duration-200"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
  </button>
</div>

</div>


      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full bg-indigo-600 text-white p-6 space-y-8 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out z-40`}
      >
        <h2 className="text-2xl font-semibold mt-10">Admin Panel</h2>
        <nav className="space-y-1">
          <a href="/" className="block text-lg hover:bg-blue-700 p-2 rounded">
            Home
          </a>
          <button
          onClick={()=>fetchDoctorApplications()}>
            Get Dr-Applications
          </button>
          <button
          className="block text-lg hover:bg-blue-700 p-2 rounded"
          onClick={()=> handleAllusers()}
          > user data</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto ml-0 lg:ml-64 transition-all duration-300">
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
                {userData.map((userdata) => (
                  <tr
                    key={userdata.User.id}
                    className="border-b hover:bg-gray-50 transition duration-300"
                  >
                    <td className="py-3 px-6 text-gray-800">
                      {userdata.User.firstname} {userdata.User.lastname}
                    </td>
                    <td className="py-3 px-6 text-gray-800">
                      {userdata.User.email}
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
