import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.log('Token not found, redirecting to login');
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log('Decoded Token:', decoded);

    // Check if the token has expired
    if (decoded.exp * 1000 < Date.now()) {
      console.log('Token expired, removing and redirecting to login');
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }

    // If token is valid, render the protected component
    return children;

  } catch (error) {
    console.error('Invalid token:', error);
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;
