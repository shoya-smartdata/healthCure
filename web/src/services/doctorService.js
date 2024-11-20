import axios from "axios";

const API_BASE_URL = "http://localhost:3030";

// Fetch all doctors
export const getalldoctors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/doctor/getalldoctors`);
    console.log("response is", response);
    
    return response.data; // Assuming response contains the list of doctors
  } catch (error) {
    throw error.response?.data?.message || "Error fetching doctors."; // Catch and throw any errors
  }
};
