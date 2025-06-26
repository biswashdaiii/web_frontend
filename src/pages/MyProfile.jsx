import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
  const initialUserInfo = {
    name: 'Ramey Daka',
    email: 'Ramey@gmail.com',
    phone: '980000000',
    address: 'Bagar Pokhara',
    gender: 'Male',
    birthday: '2024-07-20',
    image: assets.profile_pic,
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setUserInfo((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSave = () => {
    // Here you can make an API call to update the user
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 max-w-md mx-auto rounded-lg shadow-md font-sans">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Profile Image Section */}
      <div className="flex items-center justify-start gap-4 mb-6 relative">
        <img
          src={userInfo.image}
          alt="User"
          className="w-20 h-20 rounded-md object-cover"
        />
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute left-0 top-0 opacity-0 w-20 h-20 cursor-pointer"
            title="Update image"
          />
        )}
      </div>

      {/* Name */}
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className="border p-1 w-full rounded"
          />
        ) : (
          userInfo.name
        )}
      </h2>

      {/* Contact Information */}
      <hr className="mb-4" />
      <div className="text-sm text-gray-700 mb-6">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
          Contact Information
        </h3>
        <p className="mb-1">
          <span className="font-medium">Email id:</span>{' '}
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="border p-1 w-full rounded"
            />
          ) : (
            <a href={`mailto:${userInfo.email}`} className="text-blue-600">
              {userInfo.email}
            </a>
          )}
        </p>
        <p className="mb-1">
          <span className="font-medium">Phone:</span>{' '}
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="border p-1 w-full rounded"
            />
          ) : (
            <a href={`tel:${userInfo.phone}`} className="text-blue-600">
              {userInfo.phone}
            </a>
          )}
        </p>
        <p>
          <span className="font-medium">Address:</span>{' '}
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={userInfo.address}
              onChange={handleChange}
              className="border p-1 w-full rounded"
            />
          ) : (
            userInfo.address
          )}
        </p>
      </div>

      {/* Basic Information */}
      <div className="text-sm text-gray-700 mb-6">
        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-2">
          Basic Information
        </h3>
        <p className="mb-1">
          <span className="font-medium">Gender:</span>{' '}
          {isEditing ? (
            <select
              name="gender"
              value={userInfo.gender}
              onChange={handleChange}
              className="border p-1 rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            userInfo.gender
          )}
        </p>
        <p>
          <span className="font-medium">Birthday:</span>{' '}
          {isEditing ? (
            <input
              type="date"
              name="birthday"
              value={userInfo.birthday}
              onChange={handleChange}
              className="border p-1 rounded"
            />
          ) : (
            new Date(userInfo.birthday).toLocaleDateString()
          )}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-start gap-4">
        {isEditing ? (
          <button
            className="px-5 py-2 border border-green-600 text-green-700 rounded-full hover:bg-green-100"
            onClick={handleSave}
          >
            Save
          </button>
        ) : (
          <button
            className="px-5 py-2 border border-gray-500 text-gray-700 rounded-full hover:bg-gray-100"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
