import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div class="container">
        <div class="login-container">
            <h2 class="login-title">Login</h2>

            <form>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter your username"/>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter your password"/>
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>

                <div class="signup-link">
                    <p>New user? <a href="/signup">Sign up here</a></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
