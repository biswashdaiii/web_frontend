import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "ram",
    image: assets.profile_pic,
    email: "ram@example.com",
    phone: "1234567890",
    address: "Bagar Pokhara",
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg font-sans">
      <div className="flex flex-col items-center mb-6">
        <img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
        />
      </div>

      <div className="mb-6">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Name"
          />
        ) : (
          <p className="text-2xl font-semibold text-gray-900 text-center">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      <div className="mb-6">
        <h3 className="text-gray-600 font-semibold mb-3 uppercase tracking-wide">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 font-medium">Email:</p>
            <p className="text-gray-700">{userData.email || "Not set"}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Phone"
              />
            ) : (
              <p className="text-gray-700">{userData.phone || "Not set"}</p>
            )}
          </div>

          <div>
            <p className="text-gray-500 font-medium">Address:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.address}
                onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Address"
              />
            ) : (
              <p className="text-gray-700">{userData.address || "Not set"}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="px-6 py-2 bg-primary text-white rounded shadow hover:bg-primary-dark transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 border border-primary text-primary rounded shadow hover:bg-primary hover:text-white transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
