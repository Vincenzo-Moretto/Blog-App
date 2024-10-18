import { useContext, useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { URL } from "../url"; // Assicurati che URL punti correttamente al backend
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null); // File selezionato per l'upload
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState(""); // Foto corrente salvata nel post

  useEffect(() => {
    console.log("currentPhoto:", currentPhoto);
    console.log("file:", file);
    console.log("URL:", URL);
  }, [currentPhoto, file]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCurrentPhoto(res.data.photo); // Imposta l'immagine attuale del post
      setCats(res.data.categories);
    } catch (err) {
      console.log("Error fetching post:", err.response ? err.response.data : err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      photo: currentPhoto, // Mantieni l'immagine attuale se non viene caricata una nuova
    };

    if (file) {
      const data = new FormData();
      const fixedImageName = "fixed-image-name.jpg"; // Nome fisso dell'immagine
      data.append("img", fixedImageName); // Aggiungi il nome fisso
      data.append("file", file);
      post.photo = fixedImageName; // Aggiorna il campo photo con il nome fisso

      // Img upload
      try {
        const imgUpload = await axios.post(`${URL}/api/upload`, data);
        console.log("Image upload response:", imgUpload.data); // Verifica la risposta dell'upload
      } catch (err) {
        console.log("Error uploading image:", err.response ? err.response.data : err.message);
        return; // Esci se c'è stato un errore nel caricamento
      }
    }

    // Post update
    try {
      const res = await axios.put(`${URL}/api/posts/${postId}`, post, { withCredentials: true });
      console.log("Updated post response:", res.data); // Verifica i dati aggiornati
      navigate(`/posts/post/${res.data._id}`);
    } catch (err) {
      console.log("Error updating post:", err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1); // Corretto per rimuovere l'elemento all'indice i
    setCats(updatedCats);
  };

  const addCategory = () => {
    if (cat) {
      let updatedCats = [...cats];
      updatedCats.push(cat);
      setCat("");
      setCats(updatedCats);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-[200px] mt-8">
        <h1 className="font-bold md:text-2xl text-xl">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4" onSubmit={handleUpdate}>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Enter post title"
            className="px-4 py-2 outline-none"
            required
          />

          {/* Rendering dell'immagine caricata o esistente */}
          {currentPhoto && !file && <img src={`${URL}/uploads/${currentPhoto}`} alt="Post" className="w-full h-auto" />}
          {file && <img src={window.URL.createObjectURL(file)} alt="Preview" className="w-full h-auto" />}

          <input
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log("Selected file:", e.target.files[0]); // Debugging: verifica se il file è selezionato correttamente
            }}
            type="file"
            className="px-4"
          />

          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="px-4 py-2 outline-none"
                placeholder="Enter post category"
                type="text"
              />
              <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer">
                Add
              </div>
            </div>

            {/* Categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div
                  key={i}
                  className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md"
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="text-white bg-black rounded-full cursor-pointer p-1 text-sm"
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="px-4 py-2 outline-none"
            placeholder="Enter post description"
            required
          />

          <button
            type="submit"
            className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
