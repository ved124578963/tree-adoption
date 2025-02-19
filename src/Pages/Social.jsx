import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Components/Post";

const Social = () => {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
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
        <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center mb-6">Social Feed</h1>

            <form onSubmit={handleCreatePost} className="mb-6 w-full max-w-md">
                <textarea
                    className="w-full p-2 border rounded mb-2"
                    placeholder="What's on your mind?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                ></textarea>
                <input
                    type="file"
                    className="w-full p-2 border rounded mb-2"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Post
                </button>
            </form>
            {console.log(posts)}
            <div className="w-full max-w-md grid grid-cols-1 gap-6">
                {posts.map((post) => (
                    <Post key={post.id} post={post} setPosts={setPosts} />
                ))}
            </div>
        </div>
    );
};

export default Social;