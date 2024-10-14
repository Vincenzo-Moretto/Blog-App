import React, { useState } from "react";
import { Link } from "react-router-dom"; // Ensure you import Link

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <div className="flex items-center space-x-2">
          <img src="./Logo.Enzo.jpeg" alt="Logo" className="h-8 w-8" /> {/* Add your logo here */}
          <h1 className="text-lg text-xl font-extrabold">
            <Link to="/">Blog Enzo</Link>
          </h1>
        </div>
        <h3 className="text-lg">
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </h3>
      </div>
      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] sm:w-[400px] bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Create an account</h1>

          {/* Username Input */}
          <div className="w-full">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="text" // Changed to "text" for username
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Input */}
          <div className="w-full">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="email" // Remains as "email"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black transition duration-300">
            Register
          </button>

          <div className="flex justify-center items-center space-x-2">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
