import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { doctors as staticDoctors } from "../assets/assets";
import { ToastContainer } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymol = "Rs";
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

 const getDoctorsData = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
    if (data.success) {
      setDoctors(data.doctors);
    }
  } catch (err) {
    console.error(err);
  }
};



  useEffect(() => {
    getDoctorsData();
  }, []);

  const value = {
    doctors,
    currencySymol,
    token,
    setToken,
    backendUrl,
    getDoctorsData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
        <ToastContainer
      position="top-right"
      autoClose={3000}
      pauseOnHover
      theme="colored"
    />
    </AppContext.Provider>
  );
};

export default AppContextProvider;
