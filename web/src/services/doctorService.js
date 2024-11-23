import axios from "axios";

const API_BASE_URL = "http://localhost:3030";

// Fetch all doctors
export const getalldoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/doctor/getalldoctors`);
    return response.data; // Assuming response contains the list of doctors
  } catch (error) {
    throw error.response?.data?.message || "Error fetching doctors."; // Catch and throw any errors
  }
};


export const getalldoctorsreq = async () => {
  try {
    // Retrieve token from local storage (or other storage mechanism)
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authorization token is missing');
    }

    // Make the request with the Authorization header
    const response = await axios.get(`${API_BASE_URL}/api/doctor/getnotdoctors`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    // Throw a descriptive error message
    throw error.response?.data?.message || 'Unable to fetch applied doctor requests';
  }
};
