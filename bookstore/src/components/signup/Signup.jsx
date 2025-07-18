import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: '', // Changed from 'username' to match backend
    email: '',
    password: ''
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handlesignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const validateSignup = () => {
    const errors = {};
    if (!signupData.name) errors.name = 'Name is required';
    if (!signupData.email) errors.email = 'Email is required';
    else if (!signupData.email.includes('@')) errors.email = 'Invalid email';
    if (signupData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateSignup();
    setSignupErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData)
        });
        const data = await response.json();
        setIsLoading(false);
        if (response.ok) {
          console.log('Submitted:', signupData);
          navigate('/login'); // Navigate to login
        } else {
          setSignupErrors({ server: data.error || 'Signup failed' });
        }
      } catch (error) {
        setIsLoading(false);
        setSignupErrors({ server: 'Server error, please try again later' });
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
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              {signupErrors.server && (
                <div className="alert alert-danger" role="alert">
                  {signupErrors.server}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${signupErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={signupData.name}
                    onChange={handlesignupChange}
                    placeholder="Enter your name"
                    disabled={isLoading}
                  />
                  {signupErrors.name && (
                    <div className="invalid-feedback">{signupErrors.name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${signupErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={signupData.email}
                    onChange={handlesignupChange}
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                  {signupErrors.email && (
                    <div className="invalid-feedback">{signupErrors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${signupErrors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={signupData.password}
                    onChange={handlesignupChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  {signupErrors.password && (
                    <div className="invalid-feedback">{signupErrors.password}</div>
                  )}
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>Already have an account? <a href="/login">Log in</a></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;