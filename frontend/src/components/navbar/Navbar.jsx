import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch, BsSun, BsMoon } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdManageSearch } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import Menu from "../Menu";
import { UserContext } from "../../context/UserContext";
import Logo from "../../assets/Logo.Enzo.jpeg";
import "./navbar.css";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage for the saved theme preference
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const { user } = useContext(UserContext);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const navbar = document.querySelector(".navbar");

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#121212"; // Colore per la modalità scura
      document.body.style.color = "#FFFFFF"; // Colore del testo per la modalità scura
      if (navbar) {
        navbar.classList.add("dark");
      }
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#FFFFFF"; // Colore per la modalità chiara
      document.body.style.color = "#000000"; // Colore del testo per la modalità chiara
      if (navbar) {
        navbar.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <div
      className={`flex items-center justify-between px-6 md:px-[200px] py-4 bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-700 shadow-lg dark:shadow-none`}
    >
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

      {path === "/" && (
        <div className="flex justify-center items-center space-x-0 relative">
          <MdManageSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 transition-colors duration-700" />
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className="outline-none pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 text-black dark:text-white transition-all duration-700"
            placeholder="Search a post"
            type="text"
          />
          <p onClick={() => navigate(prompt ? "?search=" + prompt : "/")} className="cursor-pointer">
            <BsSearch />
          </p>
        </div>
      )}

      <div className="flex items-center md:hidden">
        <button onClick={toggleMenu} className="p-2">
          {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      <div className={`flex items-center space-x-3 md:space-x-4 ${isMenuOpen ? "flex" : "hidden"} md:flex`}>
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

        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-transform duration-700 transform hover:scale-110"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <BsSun className="text-2xl text-yellow-400 transition-transform duration-500" />
          ) : (
            <BsMoon className="text-2xl text-gray-500 transition-transform duration-500" />
          )}
        </button>

        {/* Menu for larger screens */}
        {user && (
          <div onClick={toggleMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {isMenuOpen && <Menu />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
