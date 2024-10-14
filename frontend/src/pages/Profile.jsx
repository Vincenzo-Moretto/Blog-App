import { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import ProfilePosts from "../components/profileposts/ProfilePosts";

const Profile = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Funzione che gestisce lo scroll
  const handleScroll = () => {
    setShowScrollButton(window.scrollY > 300);
  };

  // Aggiungere un listener per lo scroll quando il componente è montato
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Funzione per scrollare verso l'alto
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Example array for profile posts, replace with actual data as needed
  const postsArray = [1, 2, 3, 4, 5];

  return (
    <div>
      <Navbar />

      <div className="px-8 md:px-20 mt-8 flex flex-col-reverse md:flex-row md:items-start">
        <div className="flex flex-col md:w-2/3 w-full mt-8 md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          {postsArray.map((post, index) => (
            <ProfilePosts key={index} />
          ))}
        </div>
        <div className=" md:sticky md:top-16 flex justify-end items-start md:w-1/3 w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profiles</h1>
            <input
              className="outline-none px-4 py-2 text-gray-500 border border-gray-300 rounded-md"
              placeholder="Your Username"
              type="text"
            />
            <input
              className="outline-none px-4 py-2 text-gray-500 border border-gray-300 rounded-md"
              placeholder="Your email"
              type="text"
            />
            <input
              className="outline-none px-4 py-2 text-gray-500 border border-gray-300 rounded-md"
              placeholder="Your password"
              type="password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                className="text-white font-semibold bg-black px-4 py-2 rounded-md hover:text-black hover:bg-gray-400 transition-colors duration-200"
                aria-label="Update Profile"
              >
                Update
              </button>
              <button
                className="text-white font-semibold bg-black px-4 py-2 rounded-md hover:text-black hover:bg-gray-400 transition-colors duration-200"
                aria-label="Delete Profile"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Pulsante per tornare su */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform transform-gpu duration-300 ease-in-out hover:scale-110 hover:bg-blue-600 hover:shadow-2xl"
          aria-label="Scroll to top"
          style={{ transitionProperty: "opacity, transform" }}
        >
          <img src="../assets/Logo.Enzo.jpeg" alt="Go to top" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Profile;
