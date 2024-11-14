import React from 'react'
import './contactus.css'

const Contactus = () => {
  return (
    <div class="container">
    <div class="contact-form">
        <h2>Contact Us</h2>
        <form>
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class='form-control' id='name' placeholder='Enter Your Name' required/>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Enter your email" required/>
            </div>
            <div class="mb-3">
                <label for="message" class="form-label">Message</label>
                <textarea class="form-control" id="message" rows="5" placeholder="Write your message" required></textarea>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-primary">Send Message</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default Contactus
