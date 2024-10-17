import React, { useState } from "react"; // Import useState
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import Footer from "../components/footer/Footer";
import axios from "axios";
import { URL } from "../url"; // Import your API URL

const Register = () => {
  // Define state variables for username, email, password, and error message
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle registration
  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login"); // Navigate to login on successful registration
    } catch (err) {
      setError(true); // Set error state to true on failure
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <div className="flex items-center space-x-2">
          <img src="./Logo.Enzo.jpeg" alt="Logo" className="h-8 w-8" />
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
          {/* Error message */}
          {error && <p className="text-red-500">Registration failed. Please try again.</p>}
          {/* Username Input */}
          <div className="w-full">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="text"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)} // Handle username change
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
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)} // Handle email change
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
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)} // Handle password change
            />
          </div>
          {/* Registration button */}
          <button
            onClick={handleRegister}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black transition duration-300"
          >
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

      <Footer />
    </>
  );
};

export default Register;
