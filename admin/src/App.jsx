  import React, { useContext } from 'react';
  import Login from './pages/Login';
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  import { AdminContext } from './context/AdminContext';
  import { DoctorContext } from './context/DcotorContext.jsx';

  import Navbar from './components/Navbar';
  import Sidebar from './components/Sidebar';

  import { Routes, Route } from 'react-router-dom';

  import Dashboard from './pages/Admin/Dashboard';
  import AllAppointments from './pages/Admin/AllAppointments';
  import AddDoctor from './pages/Admin/AddDoctor';
  import DoctorList from './pages/Admin/DoctorList';

  import DoctorAppointment from './pages/Doctor/DoctorAppointment';
  import DoctorChat from './pages/Doctor/DoctorChat.jsx';

  const App = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return aToken || dToken ? (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className="flex items-start">
          <Sidebar />
          <Routes>
            {/* Admin Routes */}
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />

            {/* Doctor Routes */}
            <Route path="/doctor-chat" element={<DoctorChat />} />
            
            <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          </Routes>
        </div>
      </div>
    ) : (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  };

  export default App;
