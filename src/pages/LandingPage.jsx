import React from 'react'
import Header from '../components/Header' 
import SpecialityMenu from '../components/specialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Landing = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Landing
