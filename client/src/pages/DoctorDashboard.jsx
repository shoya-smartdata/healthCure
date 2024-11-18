import { useEffect, useState } from 'react';
import axios from 'axios';

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        const response = await axios.get('/api/doctor/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Failed to fetch doctor appointments:', error);
      }
    };
    fetchDoctorAppointments();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Doctor Dashboard</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="border p-2 my-2 rounded">
            <p><strong>Patient Name:</strong> {appointment.patientName}</p>
            <p><strong>Date:</strong> {appointment.date}</p>
            <p><strong>Reason:</strong> {appointment.reason}</p>
            <button className="bg-blue-500 text-white px-2 py-1 rounded mt-2">Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
