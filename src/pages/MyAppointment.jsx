import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="min-h-screen px-4 py-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">My appointments</h2>

      <div className="flex flex-col gap-4">
        {
          doctors.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border p-4 rounded-lg shadow-sm bg-white"
            >
              {/* Left - Doctor Info */}
              <div className="flex items-start gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="text-gray-700 text-sm">
                  <p className="font-semibold text-base text-black">{item.name}</p>
                  <p className="mb-1 italic text-gray-600">{item.speciality}</p>
                  <p className="text-gray-600"><span className="font-medium">Address:</span></p>
                  <p className="text-gray-600">{item.address.line1}</p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">Date & Time:</span> 28 June, 2025 | 8:30 PM
                  </p>
                </div>
              </div>

              {/* Right - Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 ml-auto">
                <button className="px-4 py-2 border border-gray-400 rounded hover:bg-primary hover:text-white transition">
                  Pay Online
                </button>
                <button className="px-4 py-2 border border-gray-400 rounded hover:bg-red-100 hover:text-red-600 transition">
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyAppointment;
