import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong during registration');
      }
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <form
          onSubmit={handleRegister}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Sign Up</h2>

          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              autoFocus
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-purple-600 hover:underline focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>


          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Sign Up
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Register;
