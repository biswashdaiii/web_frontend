import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const url = `${backendUrl}/api/user/my-appointments`;
      console.log("Requesting URL:", url);
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to fetch appointments");
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const url = `${backendUrl}/api/user/cancel-appointment`;
      const { data } = await axios.post(
        url,
        { appointmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev.filter((item) => item._id !== appointmentId)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to cancel appointment");
    }
  };

  // ✅ Correctly placed inside the component
const goToChat = (appointment) => {
  navigate(`/chat/${appointment._id}`);
};


  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="min-h-screen px-4 py-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">
        My Appointments
      </h2>

      <div className="flex flex-col gap-4">
        {appointments.length === 0 ? (
          <p className="text-gray-600">No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={item._id || index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border p-4 rounded-lg shadow-sm bg-white"
            >
              {/* Doctor Info */}
              <div className="flex items-start gap-4">
                <img
                  src={
                    item.docData?.image
                      ? `${backendUrl}/${item.docData.image}`
                      : "/default-doctor.png"
                  }
                  alt={item.docData?.name || "Doctor"}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="text-gray-700 text-sm">
                  <p className="font-semibold text-base text-black">
                    {item.docData?.name}
                  </p>
                  <p className="mb-1 italic text-gray-600">
                    {item.docData?.speciality}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span>
                  </p>
                  <p className="text-gray-600">
                    {item.docData?.address?.line1}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">Date & Time:</span>{" "}
                    {item.slotDate} | {item.slotTime}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 ml-auto">
                <button className="px-4 py-2 border border-gray-400 rounded hover:bg-primary hover:text-white transition">
                  Pay Online
                </button>

                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-4 py-2 border border-gray-400 rounded hover:bg-red-100 hover:text-red-600 transition"
                >
                  Cancel Appointment
                </button>

                <button
                  onClick={() => goToChat(item)}
                  className="px-4 py-2 border border-blue-400 rounded hover:bg-blue-100 hover:text-blue-600 transition flex items-center gap-1"
                  title="Chat with Doctor"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 8h10M7 12h6m-6 4h4M21 12c0 4.418-4.03 8-9 8a9.995 9.995 0 01-4.732-1.243L3 20l1.243-4.268A9.995 9.995 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Chat
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
