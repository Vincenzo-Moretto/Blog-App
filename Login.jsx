import { useState } from "react";
import { Link } from "react-router-dom"; // Assicurati di importare Link
import Footer from "../components/footer/Footer";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // Aggiungi gestione errore

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const getUser = async () => {
    try {
      // Assicurati di accedere correttamente alle variabili d'ambiente
      const apiUrl = process.env.REACT_APP_API_URL; // Questo deve funzionare
      const res = await axios.post(`${apiUrl}/api/login`, { withCredentials: true });
      console.log("Login successful");
      window.location.href = "/profile/1"; // Reindirizza correttamente all'URL "/profile/1"
    } catch (err) {
      setError("Login failed, please try again.");
      console.log(err);
    }
  };

  const verifica = () => {
    getUser();
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
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </h3>
      </div>

      <div className="flex justify-center items-center h-screen w-full bg-gray-100">
        <div className="flex flex-col justify-center items-center space-y-6 w-[90%] sm:w-[400px] bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Log in to your account</h1>
          {/* Email Input */}
          <div className="w-full">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          {/* Password Input */}
          <div className="relative w-full">
            <input
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
          {/* Messaggio di errore */}
          {error && <p className="text-red-500">{error}</p>} {/* Mostra errore se presente */}
          <button
            onClick={() => verifica()}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black transition duration-300"
          >
            Log in
          </button>
          <div className="flex justify-center items-center space-x-2">
            <p>New here?</p>
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
