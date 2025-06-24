import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physican");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  

  const { backendUrl, aToken } = useContext(AdminContext);

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image is not selected");
      }
      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", (fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1:address1,line2:address2 }));

      //console log formData
      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });
      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } } );
      if(data.success){
        toast.success(data.message);
         setDocImg(null)
        setName("")
        setPassword("")
        setExperience("1 Year")
        setEmail("")
        setAddress1("")
        setAddress2("")
        setDegree("")
        setSpeciality("GEnerap physican")
        setFees("")
      }else{
        toast.error(data.message)
       
      }
    } catch (error){
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white px-8 py-8 border rounded w-full max-w-5xl mx-auto">
      <form onSubmit={onsubmitHandler} className="space-y-6">
        <p className="text-lg font-medium mb-3">Add Doctor</p>

        {/* Upload Picture Section */}
        <div className="flex items-center gap-4 mb-6 text-gray-500">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              className="w-16 h-16 bg-gray-100 rounded-full object-cover"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload doctor"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm text-gray-600">
            Upload doctor <br /> picture
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 text-gray-600">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <p>Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="border rounded px-3 py-2"
              />
            </div>
            <div>
              <p>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Your email"
                className="border rounded px-3 py-2"
              />
            </div>
            <div>
              <p>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="border rounded px-3 py-2"
              />
            </div>
            <div>
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
              >
                <option value="">Experience</option>
                {Array.from({ length: 15 }, (_, i) => (
                  <option key={i} value={`${i + 1} year`}>{`${
                    i + 1
                  } year`}</option>
                ))}
              </select>
            </div>
            <div>
              <p>Fees</p>
              <input
                required
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="text"
                inputMode="numeric"
                placeholder="Your fees"
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <p>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                required
                className="border rounded px-3 py-2"
              >
                <option value="">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div>
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                className="border rounded px-3 py-2"
              />
            </div>
            <div>
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="Address 1"
                className="border rounded px-3 py-2"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="Address 2"
                className="border rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className="text-gray-600 mt-6">
          <p>About me</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="write about yourself"
            rows={4}
            required
            className="input w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
          >
            Add doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
