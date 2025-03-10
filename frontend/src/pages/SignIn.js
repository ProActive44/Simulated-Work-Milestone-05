import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = window.location.origin.replace('3000', '5000');

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
      signin();
  };

  const signin = async () => {

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setEmail('');
        setPassword('');
        console.log(data);
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
      {/* main contianer  */}
      <div className="flex w-full max-w-4xl rounded-lg overflow-hidden justify-center">
        {/* signup form contiane r */}
        <div className="w-full md:w-1/2 p-8 md:border-gray-300 md:rouded-lg">
          <div className="flex flex-col items-center">
            <img
              className="h-12 mb-6"
              src="https://kq-storage.s3.ap-south-1.amazonaws.com/logo.png
"
              alt="Logo"
            />
            <p className="text-gray-600 text-sm text-center my-5">
              Sign up to see photos and videos from you friends
            </p>
            <form className="space-y-4 w-full" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:ring-gray-100 text-sm"
              />
              <p className="text-gray-500 text-xs text-center my-5">
                By signing In, you agree to our <a href="/terms">Terms</a> and{' '}
                <a href="">Privacy Policy</a>
              </p>
              <button
                type="submit"
                className="block w-full bg-blue-500 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              >
                Sign In
              </button>
            </form>
            <div className="flex items-center my-4 w-full">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-400">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button className="flex items-center justify-center w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring focus:borde-blue=300">
              Continue With Google{' '}
            </button>
            <div className="mt-4 text-center text-gray-700">
              <p>
                Don't have an account? <Link to="/signup">Sign Up </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
