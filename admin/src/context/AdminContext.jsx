import { createContext, useState } from "react";

// Create the context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Define state and values inside the component
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") || ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
