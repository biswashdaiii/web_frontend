import React, { useContext } from 'react'
import{assets}from'../assets/assets'
import { AdminContext } from '../context/AdminContext'
import{useNavigate}from"react-router-dom"

const Navbar = () => {
    const{aToken,setAToken}=useContext(AdminContext)
    const navigate=useNavigate()
    const logout=()=>{
      aToken && setAToken("")
      aToken && localStorage.removeItem("aToken")
    }
  return (
    <div>
        <div>    
         <img src={assets.logo} alt="" />
     <p>{aToken?"Admin":"Doctor"}</p>
    </div>
    <button onClick={logout}>Logout</button>
    </div>

  )
}

export default Navbar
