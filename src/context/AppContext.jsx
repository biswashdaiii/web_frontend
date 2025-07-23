import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userData, setUserData] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // --- FIX IS HERE: Keep the state and fetch logic for doctors ---
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      }
    } catch (err) {
      console.error("Failed to fetch doctors:", err);
    }
  };

  // Fetch doctors on initial load
  useEffect(() => {
    getDoctorsData();
  }, []);
  // -----------------------------------------------------------------

  // This effect handles user session persistence
  useEffect(() => {
    if (token && userData) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, userData]);

  const value = {
    doctors, // Make sure to provide doctors in the context value
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    getDoctorsData, 
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover theme="colored" />
    </AppContext.Provider>
  );
};

export default AppContextProvider;