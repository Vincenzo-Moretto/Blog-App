import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
      // You might want to show an alert or some user-friendly message here
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user ? ( // Using a ternary operator for better readability
        <>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to="/login">Login</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to="/register">Register</Link>
          </h3>
        </>
      ) : (
        <>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to="/write">Write</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to={`/myblogs/${user._id}`}>My blogs</Link>
          </h3>
          <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">
            Logout
          </h3>
        </>
      )}
    </nav>
  );
};

export default Menu;
