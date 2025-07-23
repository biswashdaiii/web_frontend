import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointment from './pages/MyAppointment';
import Appointment from './pages/Appointment';
import About from './pages/About';
import ChatPage from './pages/ChatPage.jsx'; // Ensure correct import
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />

        {/* Add this fallback route for /chat to avoid no match errors */}
        <Route path="/chat" element={<div>Please select an appointment to chat.</div>} />
        
        {/* Chat page with doctorId and doctorName params */}
        {/* <Route path="/chat/:doctorId/:doctorName" element={<ChatPage />} /> */}
        <Route path="/chat/:doctorId" element={<ChatPage />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
