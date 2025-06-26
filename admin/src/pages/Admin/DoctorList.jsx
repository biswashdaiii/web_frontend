import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
  const { changeAvaiablility,doctors, aToken, getAllDoctors, backendUrl } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // Log the doctors array to see what data you have
  console.log("Doctors data from context:", doctors);
  console.log(import.meta.env.VITE_BACKEND_URL); // should log http://localhost:5050

  return (
    <div className="m-5 max-h-[-90vh] overflow-y-scroll">
      <h1 className="text -lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.length === 0 && <p>No doctors found yet.</p>}
        {doctors.map((item, index) => {
          console.log(`${backendUrl}/uploads/${item.image}`);
          // Log each item to inspect its properties
          console.log(`Doctor #${index}:`, item);

          // Use fallback for image if missing or invalid
          const cleanedPath = item.image
            .replace(/^uploads[\\/]/, "")
            .replaceAll("\\", "/");
          const imageUrl = item.image
            ? `${backendUrl}/uploads/${cleanedPath}`
            : "/default-doctor.png";

          return (
            <div key={index}>
              <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500"
                src={imageUrl}
                alt={item.name || "Doctor"}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-doctor.png";
                }}
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">{item.name}</p>
                <p className="text-zinc-600 text-sm">{item.speciality}</p>
              </div>
              <div className=" mt-2 flex items-center gap-1 text-sm">
                <input onChange={()=>changeAvaiablility(item._id)} type="checkbox" checked={item.avaiable}/>
                <p>Avaiable</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorList;
