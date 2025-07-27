import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import { assets } from "../assets/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymol,userData, backendUrl, token, getDoctorsData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = () => {
    const found = doctors.find((doc) => doc._id === docId);
    setDocInfo(found);
  };

  const getAvailableSlot = () => {
    const weeklySlots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      weeklySlots.push(timeSlots);
    }

    setDocSlot(weeklySlots);
  };

const bookAppointment = async () => {
  console.log("Token from context:", token);
  console.log("UserData from context:", userData);

  // Check if token exists
  if (!token) {
    toast.warn("Login to book appointment");
    console.log("Redirecting to login because token is missing");
    return navigate("/login");
  }

  // Get current user from context or fallback to localStorage safely
  let currentUser = userData;
  if (!currentUser) {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      try {
        currentUser = JSON.parse(userFromStorage);
      } catch (parseError) {
        console.error("Failed to parse user from localStorage:", parseError);
      }
    }
  }

  console.log("Current user:", currentUser);
  const userId = currentUser?._id || currentUser?.id;
  console.log("User ID:", userId);

  // If no user ID, redirect to login
  if (!userId) {
    toast.warn("User ID not found, please login again");
    console.log("Redirecting to login because user ID is missing");
    return navigate("/login");
  }

  try {
    // Make sure you have docSlot and slotIndex selected properly
    if (!docSlot.length || slotIndex >= docSlot.length || !docSlot[slotIndex].length) {
      toast.warn("Please select a valid date and time slot");
      return;
    }

    const date = docSlot[slotIndex][0].datetime;
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = `${day}_${month}_${year}`;
    console.log("Booking data:", { userId, docId, slotDate, slotTime });

    const { data } = await axios.post(
      `${backendUrl}/api/user/book-appointment`,
      { userId, docId, slotDate, slotTime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Booking Response:", data);

    if (data.success) {
      toast.success(data.message);
      getDoctorsData(); // Refresh doctors if needed
      navigate("/my-appointments");
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    if (error.response) {
      console.error("Response error data:", error.response.data);
      toast.error(error.response.data.message || "Booking failed");
    } else {
      toast.error("Something went wrong");
      console.error(error);
    }
  }
};



  
useEffect(() => {
  if (doctors.length === 0) {
    console.log("Doctors list empty, waiting to load...");
    return;
  }
  console.log("docid from url:", docId);
  const found = doctors.find((doc) => doc._id === docId);
  console.log("Matching doctor _id found:", found?._id);
  console.log("IDs match:", found?._id === docId);
  setDocInfo(found);
}, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="p-4">
        {/* Doctor Info Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={`${backendUrl}/${docInfo.image}`}
              alt={docInfo.name}
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-6 bg-white">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>

            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div className="mt-3">
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px]">
                {docInfo.about}
              </p>
            </div>

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymol}:
                {docInfo.fee}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
          <p className="mb-2">Booking Slots</p>

          {/* Days */}
          <div className="flex gap-3 overflow-x-auto mt-2">
            {docSlot.map((daySlots, index) => {
              const firstSlot = daySlots?.[0];
              if (!firstSlot || !firstSlot.datetime) return null;

              return (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-4 px-3 min-w-16 rounded-full cursor-pointer ${
                    slotIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-300"
                  }`}
                >
                  <p>{daysOfWeek[firstSlot.datetime.getDay()]}</p>
                  <p>{firstSlot.datetime.getDate()}</p>
                </div>
              );
            })}
          </div>

          {/* Time slots */}
          <div className="flex items-center gap-3 overflow-x-auto mt-4">
            {docSlot[slotIndex] &&
              docSlot[slotIndex].map((slot, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`text-sm px-5 py-2 rounded-full cursor-pointer flex-shrink-0 ${
                    slot.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-600 border border-gray-300"
                  }`}
                >
                  {slot.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-10 py-3 rounded-full my-6"
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;