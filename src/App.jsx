import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import ChatPage from "./pages/ChatPage.jsx"; // Ensure correct import
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Success from "./components/Success"; // Add your payment success component
import Failure from "./components/Failure"; // Add your payment failure component

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />

        {/* Chat routes */}
        <Route
          path="/chat"
          element={<div>Please select an appointment to chat.</div>}
        />
        <Route path="/chat/:doctorId" element={<ChatPage />} />

        {/* Payment result routes */}
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failure" element={<Failure />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
