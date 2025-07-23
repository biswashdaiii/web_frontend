import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    address: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  // When entering edit mode, populate form with current data
  const handleEdit = () => {
    setEditData({
      name: userData.name || "",
      phone: userData.phone || "",
      address: userData.address || "",
      image: null,
    });
    setImagePreview(
      userData.profileImage
        ? `${backendUrl}/${userData.profileImage}`
        : "/default-profile.png"
    );
    setIsEdit(true);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("email", userData.email); // Required for backend
    formData.append("phone", editData.phone);
    formData.append("address", editData.address);
    if (editData.image) {
      formData.append("image", editData.image);
    }
    formData.append("userId", userData._id || userData.id); // Pass userId for update

    try {
      const response = await axios.put(
        `${backendUrl}/api/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setUserData(response.data.user);
        setIsEdit(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert(
        "Error: " +
          (error.response?.data?.message || "Failed to update profile.")
      );
    }
  };

  if (!userData) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  const profileImageUrl = isEdit
    ? imagePreview
    : userData.profileImage
    ? `${backendUrl}/${userData.profileImage}`
    : "/default-profile.png";

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg font-sans">
      <div className="flex flex-col items-center mb-6">
        <img
          src={profileImageUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-primary"
        />
        {isEdit && (
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="mt-4 text-sm"
          />
        )}
      </div>

      <div className="mb-6">
        {isEdit ? (
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Name"
          />
        ) : (
          <p className="text-2xl font-semibold text-gray-900 text-center">
            {userData.name}
          </p>
        )}
      </div>

      <hr className="my-4" />

      <div className="mb-6">
        <div>
          <p className="text-gray-500 font-medium">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Phone"
            />
          ) : (
            <p className="text-gray-700">{userData.phone || "Not set"}</p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-gray-500 font-medium">Address:</p>
          {isEdit ? (
            <input
              type="text"
              name="address"
              value={editData.address}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Address"
            />
          ) : (
            <p className="text-gray-700">{userData.address || "Not set"}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        {isEdit ? (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-primary text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="px-6 py-2 border border-primary text-primary rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
