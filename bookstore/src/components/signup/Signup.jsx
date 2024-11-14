import React from 'react'
import './Signup.css'

const Signup = () => {
  return (
    <div class="container">
        <div class="signup-container">
            <h2 class="signup-title">Sign Up</h2>

            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter your Name"/>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter your password"/>
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </div>

                <div class="signup-link">
                    <p>Already Have An Account? <a href="/login">Sign up here</a></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
