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
