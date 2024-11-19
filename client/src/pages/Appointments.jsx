import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Optional if you want to use axios for HTTP requests

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!user || !token) {
      navigate('/login');
      return;
    }

    // If user is authenticated, fetch the appointments
    const fetchAppointments = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('http://localhost:3030/api/appointment/getallappointments', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });
        console.log("yeh raha ", response);
        
        
        setAppointments(response);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Your Appointments</h2>
      <div className="space-y-4">
        {appointments.length === 0 ? (
          <p>No appointments available.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white p-4 rounded-lg shadow-md">
              <p><strong>Doctor:</strong> {appointment.doctor}</p>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Appointments;
