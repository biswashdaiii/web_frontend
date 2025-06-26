import React from 'react'
import { useContext, } from 'react'
import { AppContext } from '../context/AppContext.jsx';
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets.js';
import RelatedDoctors from '../components/RelatedDoctors.jsx';

const Appointment = () => {
  const{docId}=useParams()
  const{doctors,currencySymol}=useContext(AppContext)
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  
  const[docInfo,setDocInfo]=useState(null)
  const [docSlot,setDocSlot]=useState([])
  const[slotIndex,setSlotIndex]=useState(0)
  const[slotTime,setSlotTime]=useState("")

  const fetchDocInfo=async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId)
    setDocInfo(docInfo)
    
  }

  const getAvaiableSlot = async () => {
  const weeklySlots = [];
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);

    let endTime = new Date(currentDate);
    endTime.setHours(21, 0, 0, 0);

    if (i === 0) {
      currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
      currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
    } else {
      currentDate.setHours(10);
      currentDate.setMinutes(0);
    }

    let timeSlots = [];

    while (currentDate < endTime) {
      const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      timeSlots.push({
        datetime: new Date(currentDate),
        time: formattedTime
      });

      currentDate.setMinutes(currentDate.getMinutes() + 30);
    }

    weeklySlots.push(timeSlots);
  }

  setDocSlot(weeklySlots); // this becomes a 2D array
};

  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])

  useEffect(()=>{
    if(docInfo)getAvaiableSlot()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlot);
  },[docSlot])

  return docInfo && (
    <div>
     {/*==========Doctor details==== */}
     <div className='flex flex-col sm:flex-row gap-4'>
      <div>
        {docInfo ?(
           <img className='bg-primary w-full ms:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        ):(<p>Loading doctor data</p>

        )}
       
      </div>
      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        {/*Doc info name egree */}
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>{docInfo.name}
          <img  className =" w-5"src={assets.verified_icon} alt="" />
        </p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          
          <p>{docInfo.degree}-{docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>
        <div>
          {/*about */}
          
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
          <p className='text-sm text-gray-500 max-w-[700px]'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>Appointment fee : <span className='text-gray-600'>{currencySymol}{docInfo.fees}</span></p>
      </div>
     </div>
     {/*BOOLING SLOTS */}
     <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
     <div className='flex gaap-3 items-center w-full overflow-x-scroll mt-4'> {
        docSlot.length && docSlot.map((item,index)=>(
          <div onClick={()=> setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' :'border border-gray-300'}`} key ={index}>
            <p>{item[0]&& daysOfWeek[item[0].datetime.getDay()]}</p>
            <p>{item[0]&& item[0].datetime.getDate()}</p>
          </div>
        ))
      }</div>

      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlot.length && docSlot[slotIndex].map((item,index)=>(
          <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ?'bg-primary text-white':'text-gray-600 border border-gray-300'}`} key ={index}>
            {item.time.toLowerCase()}
          </p>
        ))}
      </div>
      <button  className='bg-primary text-white text-sm font--light px-14 py-3 rounded-full my-6'>Book an appointment</button>
     </div>
     {/*==== related doctors==*/}
     <RelatedDoctors docId={docId} speciality ={docInfo.speciality}/>
    </div>
  )
}

export default Appointment
