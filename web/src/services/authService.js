import axios from "axios";

const API_BASE_URL =  "http://localhost:3030";



// Login API
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/login`, credentials);
    return response.data; // Typically returns token or user info
  } catch (error) {
    throw error.response?.data || "Error logging in.";
  }
};

// Register API
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/user/register`, userData);
    return response.data;
     // Typically returns success message
  } catch (error) {
    throw error.response?.data || "Error registering user.";
  }
};


// Verify Token API (optional, for persistent login checks)
export const verifyToken = async (token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/verify-token`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns token validation status or user details
  } catch (error) {
    throw error.response?.data || "Error verifying token.";
  }
};
