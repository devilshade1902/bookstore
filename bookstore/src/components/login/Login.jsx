import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed import (use 'react-router-dom')

const Login = () => {
  const [logindata, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Added for loading state
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...logindata, [name]: value });
  };

  const validateLogin = () => {
    const errors = {};
    if (!logindata.email) errors.email = 'Email is required';
    else if (!logindata.email.includes('@')) errors.email = 'Invalid email';
    if (logindata.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const errors = validateLogin();
    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/login', { // Changed to port 3000
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logindata)
        });
        const data = await response.json();
        setIsLoading(false);

        if (response.ok) {
          localStorage.setItem('token', data.token); // Store JWT token
          console.log('Logged in successfully:', logindata);
          navigate('/'); // Navigate to home only on success
        } else {
          setLoginErrors({ server: data.error || 'Login failed' }); // Fixed 'data.errors' to 'data.error'
        }
      } catch (error) {
        setIsLoading(false);
        setLoginErrors({ server: 'Server error, please try again later' });
        console.error('Fetch error:', error);
      }
    } else {
      console.log('Validation errors:', errors);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {loginErrors.server && (
                <div className="alert alert-danger" role="alert">
                  {loginErrors.server}
                </div>
              )}
              <form onSubmit={handlesubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${loginErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={logindata.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                  {loginErrors.email && (
                    <div className="invalid-feedback">{loginErrors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${loginErrors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={logindata.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  {loginErrors.password && (
                    <div className="invalid-feedback">{loginErrors.password}</div>
                  )}
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging In...' : 'Login'}
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>Don't have an account? <a href="/">Sign up</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;