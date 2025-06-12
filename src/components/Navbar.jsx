import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const navLinkClasses = ({ isActive }) =>
  `py-1 px-2 transition duration-300 ${
    isActive ? 'border-b-2 border-primary' : 'hover:border-b-2 hover:border-primary'
  }`;

const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(false); // toggle false to show "Create Account" button

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="logooo" />

      <ul className="hidden md:flex items-center gap-5 font-medium">
        <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
        <li><NavLink to="/doctors" className={navLinkClasses}>All Doctors</NavLink></li>
         <li><NavLink to="/chat" className={navLinkClasses}>Chat</NavLink></li>
        <li><NavLink to="/about" className={navLinkClasses}>About</NavLink></li>
        <li><NavLink to="/contact" className={navLinkClasses}>Contact</NavLink></li>
       
      </ul>

      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img src={assets.profile_pic} alt="Profile" className="w-8 h-8 rounded-full" />
            <img src={assets.dropdown_icon} alt="Dropdown icon" className="w-4 h-4" />

            <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-[12rem] bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                <p className="hover:text-black cursor-pointer">MyProfile</p>
                <p className="hover:text-black cursor-pointer">MyAppointment</p>
                <p className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
