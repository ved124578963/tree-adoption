import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const Post = ({ post, setPosts }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(
        post.likes ? post.likes.length : 0
    );

    useEffect(() => {
        if (
            post.likes &&
            post.likes.some((like) => like.treeOwner.username === user.username)
        ) {
            setLiked(true);
        }
    }, [post.likes, user.username]);

    const handleDelete = async () => {
        if (!user) {
            alert("You must be logged in to delete a post.");
            return;
        }

        try {
            await axios.delete(
                `https://treeplantadopt-springboot-production.up.railway.app/posts/delete/${post.id}/${post.treeOwner.id}`
            );
            setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleLike = async () => {
        if (!user) {
            alert("You must be logged in to like a post.");
            return;
        }

        if (liked) {
            alert("You have already liked this post.");
            return;
        }

        try {
            await axios.post(
                `https://treeplantadopt-springboot-production.up.railway.app/posts/like/${post.id}/${userId}`
            );
            setLiked(true);
            setLikeCount(likeCount + 1);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md relative">
            <div className="flex items-center mb-2">
                <img
                    src={"https://as2.ftcdn.net/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg"}
                    // alt={post.treeOwner.username}
                    className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                    <p className="font-bold">{post.treeOwner.username}</p>
                    <p className="text-gray-600 text-sm">{post.text}</p>
                </div>
            </div>
            {post.imagePath && (
                <img
                    src={`https://treeplantadopt-springboot-production.up.railway.app/files/post/images/${post.imagePath}`}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg mb-2"
                    style={{ marginBottom: "2rem" }} // Add margin to prevent overlap
                />
            )}
            {post.treeOwner.id === userId && (
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            )}
            <div className="absolute bottom-4 right-4 flex items-center">
                <button
                    onClick={handleLike}
                    className={`mr-2 ${
                        liked ? "text-red-500" : "text-gray-500"
                    }`}
                    disabled={liked}
                >
                    <FaHeart size={24} />
                </button>
                <span className="text-gray-600">{likeCount}</span>
            </div>
        </div>
    );
};

export default Post;