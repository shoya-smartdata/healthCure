import axios from "axios";

const API_BASE_URL = "http://localhost:3030";



export const bookappointment = async (credentials) => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Authorization token is missing.");
      }
  
      const response = await axios.post(
        `${API_BASE_URL}/api/appointment/bookappointment`,
        {
          ...credentials,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Response is:", response.data); // Ensure response format is as expected
      return response.data;
    } catch (error) {
      // Log entire error object for debugging
      console.error("Error in booking appointment:", error.response || error.message || error);
      throw error.response?.data?.message || error.message || "Error booking appointment.";
    }
  };
  

  //fetch all appointsment 
  export const fetchallAppointments = async (searchKeyword = "") => {
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        throw new Error("Authorization token is missing.");
      }
  
      const response = await axios.get(
        `${API_BASE_URL}/api/appointment/getallappointments`,
        {
          params: { search: searchKeyword }, // Attach search keyword as query parameter
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Fetched appointments:", response.data); // Log response data for debugging
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error.response || error.message || error);
      throw error.response?.data?.message || error.message || "Error fetching appointments.";
    }
  };
  