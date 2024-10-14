import Comment from "../components/comment/Comment";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import p1 from "../assets/p1.jpeg";

const PostDetails = () => {
  return (
    <div>
      <Navbar />

      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">
            10 Uses of Artificial Intelligence in Day to Day Life
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p>
              <BiEdit />
            </p>
            <p>
              <MdDelete />
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@enzodev</p>
          <div className="flex space-x-2">
            <p>23/06/1993</p>
            <p>23:00</p>
          </div>
        </div>

        {/* Immagine di dimensioni maggiori, centrata e senza border radius */}
        <img src={p1} className="w-72 h-72 object-cover mx-auto mt-8 rounded-none" alt="Post Image" />

        <h3 className="mx-auto mt-8 font-semibold">Descrizione</h3>
        <p className="mx-auto mt-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos harum et exercitationem eligendi, iure sint
          facilis nisi. Quaerat iste animi corrupti quos ea incidunt error itaque dicta aspernatur id? Delectus. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Eos harum et exercitationem eligendi, iure sint facilis
          nisi. Quaerat iste animi corrupti quos ea incidunt error itaque dicta aspernatur id? Delectus.
        </p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">Tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">Ai</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          <Comment />
          <Comment />
          <Comment />
        </div>
        {/* Sezione per scrivere un commento */}
        <div className="w-full flex flex-col mt-4 md:flex-row">
          <input type="text" placeholder="Write a comment" className="md:w-[80%] outline-none px-4 mt-4 md:mt-0" />
          <button className="bg-black text-sm text-white px-4 py-2 md:w-[20%] mt-4 md:mt-0 rounded-full">
            Add Comment
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
