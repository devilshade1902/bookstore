import React from 'react'
import './Navbar.css'
import navprofile from '../../assets/nav-logo-profile.jpg'

const Navbar = () => {
  return (
    <div className='navbar'>
     <h1>Bookstore</h1>
      <img src={navprofile} alt=""  style={{borderRadius:'50%', width:'100px'}}/>
    </div>
  )
}

export default Navbar
