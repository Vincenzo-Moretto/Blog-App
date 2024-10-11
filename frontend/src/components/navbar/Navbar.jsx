import { Link } from "react-router-dom";
import { MdManageSearch } from "react-icons/md";
import { useState, useEffect } from "react";
import { BsSun, BsMoon } from "react-icons/bs"; // Icone sole e luna
import { FaBars, FaTimes } from "react-icons/fa"; // Icone hamburger e chiusura
import "./navbar.css";

const Navbar = () => {
  //con true sn on con false sn out
  const user = false;
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-white dark:bg-gray-900 text-black dark:text-white transition-all duration-700 shadow-lg dark:shadow-none">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-extrabold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-700">
          <Link to="/">Blog Enzo</Link>
        </h1>
        <img
          src="./Logo.Enzo.jpeg"
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
          <h3 className="text-lg font-semibold">Profile</h3>
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
  );
};

export default Navbar;
