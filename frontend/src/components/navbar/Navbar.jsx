import { Link, useNavigate } from "react-router-dom";
import { MdManageSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs"; // Icone sole e luna
import { FaBars, FaTimes } from "react-icons/fa"; // Icone hamburger e chiusura
import "./navbar.css";
import Logo from "../../assets/Logo.Enzo.jpeg";

const Navbar = () => {
  // Stato per verificare se l'utente è loggato
  const [user, setUser] = useState(true); // Impostato a true per simulare l'accesso
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Stato per mostrare il popup di logout
  const navigate = useNavigate(); // Hook per la navigazione

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    setShowLogoutModal(true); // Mostra la finestra di conferma logout
  };

  const handleLogout = () => {
    setShowLogoutModal(false); // Chiudi la finestra di conferma
    setUser(false); // Imposta l'utente come non loggato
    navigate("/"); // Reindirizza alla home
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false); // Chiudi la finestra di conferma
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-700 shadow-lg dark:shadow-none">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-extrabold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-700">
            <Link to="/">Blog Enzo</Link>
          </h1>
          <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 shadow-lg transition-all duration-700"
          />
        </div>

        <div className="flex items-center md:hidden">
          <button onClick={toggleMenu} className="p-2">
            {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>

        <div className={`flex items-center space-x-3 md:space-x-4 ${isMenuOpen ? "flex" : "hidden"} md:flex`}>
          <div className="relative">
            <MdManageSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 transition-colors duration-700" />
            <input
              className="outline-none pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-black dark:text-white transition-all duration-700"
              placeholder="Search a post"
              type="text"
            />
          </div>
          {user ? (
            <Link to="/write" className="text-lg font-semibold hover:underline">
              Write
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-700"
            >
              Login
            </Link>
          )}
          {user ? (
            <h3 onClick={handleProfileClick} className="text-lg font-semibold cursor-pointer">
              Profile
            </h3>
          ) : (
            <Link
              to="/register"
              className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-700"
            >
              Register
            </Link>
          )}

          {/* Pulsante per il tema sole/luna */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform duration-700 transform hover:scale-110"
          >
            {darkMode ? (
              <BsSun className="text-2xl text-yellow-400 transition-transform duration-500" />
            ) : (
              <BsMoon className="text-2xl text-gray-500 transition-transform duration-500" />
            )}
          </button>
        </div>
      </div>

      {/* Modale di conferma logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">Sei sicuro di voler disconnetterti?</h2>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              >
                Logout
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
