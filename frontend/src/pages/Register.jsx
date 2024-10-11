import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Assicurati di importare Link e useNavigate
import Footer from "../components/footer/Footer";
import axios from "axios";
import { URL } from "../url";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password });
      // Potresti voler gestire un feedback di successo, ad esempio, mostrando un messaggio di successo
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(""); // Pulisci la password dopo la registrazione
      setError(false);
      navigate("/login");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <div className="flex items-center space-x-2">
          <img src="./Logo.Enzo.jpeg" alt="Logo" className="h-8 w-8" /> {/* Aggiungi qui il tuo logo */}
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
          <h1 className="text-2xl font-bold mb-4">Crea un account</h1>

          {/* Input Username */}
          <div className="w-full">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Nome Utente
            </label>
            <input
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="text"
              placeholder="Inserisci il tuo nome utente"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Input Email */}
          <div className="w-full">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input Password */}
          <div className="relative w-full">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              type={showPassword ? "text" : "password"}
              placeholder="Inserisci la tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-600"
            >
              {showPassword ? "Nascondi" : "Mostra"}
            </button>
          </div>

          {/* Messaggio di Errore */}
          {error && <h3 className="text-red-500 text-sm">Qualcosa è andato storto</h3>}

          <button
            onClick={handleRegister}
            className="w-full px-4 py-3 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black transition duration-300"
          >
            Registrati
          </button>

          <div className="flex justify-center items-center space-x-2">
            <p>Hai già un account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              Accedi
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
