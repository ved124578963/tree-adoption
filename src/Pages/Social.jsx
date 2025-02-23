import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Components/Post";

const Social = () => {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    axios
      .get(
        "https://treeplantadopt-springboot-production.up.railway.app/posts/all"
      )
      .then((response) => setPosts(response.data.reverse()))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a post.");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    formData.append("ownerId", userId);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/posts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPosts([response.data, ...posts]);
      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen mt-15 bg-green-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-black mb-8 drop-shadow-lg">
        Social Feed
      </h1>

      <form
        onSubmit={handleCreatePost}
        className="mb-6 w-full max-w-md bg-white p-6 rounded-2xl shadow-xl transition-all hover:shadow-2xl"
      >
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 cursor-pointer bg-gray-100 hover:bg-gray-200"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
        >
          Post
        </button>
      </form>

      <div className="w-full max-w-md grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <Post post={post} setPosts={setPosts} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Social;
