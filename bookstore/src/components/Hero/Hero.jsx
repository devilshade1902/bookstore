import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <img src="https://ew.com/thmb/rvat6WP-MplFuFNA4xJ-aGKEADc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9781408855652-png-c57764456b554308ae1398474caab3c2.jpg" alt="" />
      </div>
      <div className="hero-right">
        <h3>Unlock the Magic of Harry Potter – Limited Time Offer!</h3>
        <p>Step into the wizarding world with our exclusive Harry Potter collection, available for a limited time! <br />Whether you're a lifelong fan or new to the magic, this is your chance to bring home the entire series at <br />a special discount. Dive into the adventures of Harry, Hermione, and Ron as they battle dark forces and uncover the <br /> mysteries of Hogwarts. Save up to 30% on all Harry Potter books, collector’s editions, and themed merchandise. <br />Don't miss out on this enchanting offer—grab your set before it disappears like a charm!</p>
        <Link className='link'><p className='btn btn-dark buynow' >Buy Now</p></Link>
      </div>
    </div>
  )
}

export default Hero
