import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [user, setUser] = useState(null); // Simulate the user login status (use Redux in real app)

  // Simulating fetching doctors data
  useEffect(() => {
    // Replace this with your API call to fetch doctors
    const fetchedDoctors = [
      { id: 1, name: 'Dr. Smith', specialty: 'Dermatology', img: 'doctor1.jpg' },
      { id: 2, name: 'Dr. Brown', specialty: 'Cardiology', img: 'doctor2.jpg' },
      { id: 3, name: 'Dr. Taylor', specialty: 'Pediatrics', img: 'doctor3.jpg' },
    ];
    setDoctors(fetchedDoctors);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 flex flex-col items-center justify-start p-6 text-white">
      <nav className="w-full flex justify-between items-center mb-8">
        <Link to="/" className="text-2xl font-bold text-white">Doctor App</Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          {user ? (
            <Link to="/appointments" className="bg-green-600 px-4 py-2 rounded text-white">Appointments</Link>
          ) : (
            <Link to="/login" className="bg-blue-600 px-4 py-2 rounded text-white">Login</Link>
          )}
        </div>
      </nav>

      <h1 className="text-4xl font-extrabold leading-tight mb-8 text-center">Our Expert Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img src={doctor.img} alt={doctor.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialty}</p>
            <Link to={`/doctor/${doctor.id}`} className="mt-4 text-blue-500">View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
