import axios from "axios";
import Footer from "../components/footer/Footer";
import HomePosts from "../components/homeposts/HomePosts";
import Navbar from "../components/navbar/Navbar";
import { IF, URL } from "../url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(true); // Inizializza a true per mostrare il loader
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true); // Imposta loader a true all'inizio del fetch
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      console.log("Fetched posts:", res.data); // Log per verificare i dati
      setPosts(res.data);
      setNoResults(res.data.length === 0);
    } catch (err) {
      console.error("Error fetching posts:", err.response ? err.response.data : err.message);
      setNoResults(true);
    } finally {
      setLoader(false); // Imposta loader a false alla fine del fetch
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="text-center font-bold mt-16">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
