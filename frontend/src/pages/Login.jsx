import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer/Footer";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Per la navigazione

  // Funzione per mostrare/nascondere la password
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Funzione per effettuare il login
  const getUser = async () => {
    try {
      // Usa la variabile d'ambiente VITE_API_URL per ottenere l'URL dell'API
      const apiUrl = import.meta.env.VITE_API_URL;

      console.log("API URL:", apiUrl);

      // Effettua la richiesta POST al backend
      const res = await axios.post(
        `${apiUrl}/api/auth/login`, // Usa l'URL dell'API
        { email, password },
        { withCredentials: true } // Invia i cookie per autenticazione
      );

      console.log("Login successful", res.data);
      navigate("/"); // Reindirizza alla pagina profilo
    } catch (err) {
      setError("Login failed, please try again.");
      console.error("Login error:", err.response ? err.response.data : err.message);
    }
  };

  // Funzione per verificare i campi e chiamare getUser
  const verifica = () => {
    // Resetta il messaggio di errore se l'utente inizia a digitare di nuovo
    setError(null);

    // Verifica che email e password siano state inserite
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Messaggio di errore */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={verifica}
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
