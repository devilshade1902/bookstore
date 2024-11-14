import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 footer-brand">
                    <h1>BookStore</h1>
                    <p>Best Books Here</p>
                </div>

                <div class="col-lg-4">
                    <h5>Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="/">Home</a></li>
                        <li><a href="/allbooks">All Books</a></li>
                        <li><a href="/aboutus">About Us</a></li>
                        <li><a href="/contactus">Contact</a></li>
                    </ul>
                </div>

                <div class="col-lg-4">
                    <h5>Follow Us</h5>
                    <div class="social-icons">
                        <a href="https://facebook.com" target="_blank"><i class="bi bi-facebook"></i></a>
                        <a href="https://twitter.com" target="_blank"><i class="bi bi-twitter"></i></a>
                        <a href="https://instagram.com" target="_blank"><i class="bi bi-instagram"></i></a>
                        <a href="https://youtube.com" target="_blank"><i class="bi bi-youtube"></i></a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 Bookstore. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
