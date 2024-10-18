import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { URL } from "../../url";

const Comment = ({ c, refreshComments }) => {
  const [liked, setLiked] = useState(false); // Stato per gestire il like

  const handleDeleteComment = async () => {
    try {
      await axios.delete(URL + "/api/comments/" + c._id, { withCredentials: true });
      refreshComments(); // Ricarica i commenti dopo l'eliminazione
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked); // Cambia lo stato del like
    // Invia la logica per memorizzare il like nel server se necessario
    // await axios.post(URL + "/api/comments/like", { commentId: c._id }, { withCredentials: true });
  };

  return (
    <div className="flex justify-between items-center border-b py-2">
      <div className="flex flex-col">
        <p className="font-semibold">{c.author}</p>
        <p>{c.comment}</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer" onClick={toggleLike}>
          {liked ? (
            <AiFillHeart className="text-red-500" size={24} />
          ) : (
            <AiOutlineHeart className="text-gray-500" size={24} />
          )}
        </div>
        <div className="cursor-pointer" onClick={handleDeleteComment}>
          <MdDelete />
        </div>
      </div>
    </div>
  );
};

export default Comment;
