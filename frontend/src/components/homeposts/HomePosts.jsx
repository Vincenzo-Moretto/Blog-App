import { useState, useEffect } from "react";

const HomePosts = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Funzione che gestisce lo scroll
  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Mostra il pulsante dopo 300px di scroll
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
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
      {/* left */}
      <div className="w-[35%] h-[200px] flex justify-center item-center">
        <img src="./coding.png" alt="" className="h-full w-full object-cover" />
      </div>
      {/* right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold mb:-2 mb-1 md:text-2xl">
          10 Uses of Artificial Intelligence in Day to Day Life
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 item-center justify-between md:mb-4">
          <p>@enzodev</p>
          <div className="flex space-x-2">
            <p>23/06/1993</p>
            <p>23:00</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure quasi quos optio culpa eius fugiat consequatur
          ducimus porro itaque pariatur impedit, ea ratione commodi rem iusto ipsum quaerat? Quae, consectetur.
        </p>
      </div>

      {/* Pulsante per tornare su */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg transition-transform transform-gpu duration-300 ease-in-out hover:scale-110 hover:bg-blue-600 hover:shadow-2xl"
          style={{ transitionProperty: "opacity, transform" }}
        >
          <img src="./Logo.Enzo.jpeg" alt="Go to top" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default HomePosts;
