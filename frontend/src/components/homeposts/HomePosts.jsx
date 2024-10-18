/* eslint-disable react/prop-types */
import { IF } from "../../url";
import { useState, useEffect } from "react";

const HomePosts = ({ post }) => {
  const [showScrollButton, setShowScrollButton] = useState(false); // Aggiunta di useState per showScrollButton

  // Funzione per gestire lo scroll
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

  return (
    <div className="w-full flex mt-8 space-x-4">
      {/* Sezione sinistra */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        {/* Aggiorna questa riga per usare il nome reale dell'immagine */}
        <img
          src={`${IF}${post.realImageName || post.photo}`} // Fallback a post.photo se realImageName non è disponibile
          alt="Post"
          className="h-full w-full object-cover"
        />
      </div>
      {/* Sezione destra */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">{post.title}</h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">{post.desc.slice(0, 200) + " ...Leggi di più"}</p>
      </div>

      {/* Pulsante per tornare su */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform transform-gpu duration-300 ease-in-out hover:scale-110 hover:bg-blue-600 hover:shadow-2xl"
          style={{ transitionProperty: "opacity, transform" }}
        >
          <img src="./Logo.Enzo.jpeg" alt="Torna su" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default HomePosts;
