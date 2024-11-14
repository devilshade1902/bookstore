import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [active,setActive] = useState('home')
  return (
    <div className='navbar'>
      <div className="navbar-name">
        <h2>BookStore</h2>
      </div>
      <div class="searchbar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
          viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <input type="text" placeholder='Search...' />
      </div>
      <div className="nav-links">
        <li>
          <Link to='/' style={{textDecoration:'none', color:'black'}}><ul onClick={()=>{setActive('home')}}>
            Home{active==='home'?<hr/>:<></>}</ul></Link>
          <Link to='aboutus' style={{textDecoration:'none', color:'black'}}><ul onClick={()=>{setActive('aboutus')}}>
            About Us{active==='aboutus'?<hr/>:<></>}</ul></Link>
          <Link to='allbooks' style={{textDecoration:'none', color:'black'}}><ul onClick={()=>{setActive('allbooks')}}>
            All Books{active==='allbooks'?<hr/>:<></>}</ul></Link>
          <Link to='contactus' style={{textDecoration:'none', color:'black'}}><ul onClick={()=>{setActive('contactus')}}>
            Contact us{active==='contactus'?<hr/>:<></>}</ul></Link>
          <Link to='login' style={{textDecoration:'none', color:'black'}}><ul onClick={()=>{setActive('login')}}>
            Login{active === 'login'?<hr/>:<></>}</ul></Link>
          <Link to='signup' style={{textDecoration:'none', color:'black'}}><ul onClick={()=>{setActive('signup')}}>
            Signup{active === 'signup'?<hr/>:<></>}</ul></Link>
            <Link to='cart' style={{textDecoration:'none', color:'black'}}><ul onClick={()=>{setActive('cart')}}>
              Cart{active === 'cart'?<hr/>:<></>}</ul></Link>
        </li>
      </div>
     
    </div>
    
  )
}

export default Navbar
