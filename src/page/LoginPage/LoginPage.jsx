import React, { useState } from 'react';
import useFetch from '../../hooks/UseFetch'; // Adjust the import path as needed
import Logo from '../../components/Logo';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../../Urls';
 
 
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { data, error, loading, request } = useFetch();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const loginData = {
      email: formData.email,
      password: formData.password
    };

    await request(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData)
    });
  };

  const navigate = useNavigate();

  // Handle successful login
  React.useEffect(() => {
    if (data && data.success) {
      console.log('Login successful:', data);
      // Store token in memory or handle navigation
      // For example: navigate to dashboard or store token

      // registered : null
      // role : "ROLE_USER"
      // subscribed : null

      alert(`Welcome! Logged in as ${data.email}`);
      if (data.registered === false || data.registered === null) {
        navigate('/plans');
      } else {
        window.location.href = "/";
        navigate('/');
      }

      // You can also store the token:
      // const token = data.token;
      // Navigate to dashboard or home page here
    }
  }, [data]);

  return (
    <div className="min-h-screen bg-[var(--color-wih-900)] text-[var(--color-wih-50)] flex flex-col">
      {/* Top Logo */}
      <Logo />

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-3xl bg-[var(--color-wih-800)] rounded-2xl p-12 shadow-lg">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold mb-2">
              Welcome to WorkInHarmony!
            </h1>
            <p className="text-[var(--color-wih-600)]">
              login to your account to continue
            </p>
          </div>

          {/* Display API Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {/* Display Success Message */}
          {data && data.success && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-200">
              {data.message}
            </div>
          )}

          {/* Main Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row gap-10 items-center justify-center"
          >
            {/* Inputs and Button */}
            <div className="flex-1 w-full max-w-sm space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm mb-2 text-[var(--color-wih-50)]"
                >
                  What is your email ?
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[var(--color-wih-900)] border rounded-lg focus:outline-none focus:border-indigo-500 text-[var(--color-wih-50)] ${
                    formErrors.email ? 'border-red-500' : 'border-[var(--color-wih-700)]'
                  }`}
                  disabled={loading}
                />
                {formErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 text-[var(--color-wih-50)]"
                >
                  Enter your password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-[var(--color-wih-900)] border rounded-lg focus:outline-none focus:border-indigo-500 text-[var(--color-wih-50)] ${
                    formErrors.password ? 'border-red-500' : 'border-[var(--color-wih-700)]'
                  }`}
                  disabled={loading}
                />
                {formErrors.password && (
                  <p className="text-red-400 text-sm mt-1">{formErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
