import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// Create the context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Define state and values inside the component
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
  const [doctors, setDoctors] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async () => {
  console.log("Calling getAllDoctors API...");
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/admin/all-doctors`,
      {},
      { headers: { atoken: aToken } }
    );
    console.log("Response from API:", data);

    if (data.success) {
      setDoctors(data.doctors);
      console.log("Doctors loaded from API:", data.doctors);
    } else {
      toast.error(data.message || "Failed to load doctors");
    }
  } catch (error) {
    console.error("Fetch error:", error.response?.data || error.message);
    toast.error("Error fetching doctors");
  }
};

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
