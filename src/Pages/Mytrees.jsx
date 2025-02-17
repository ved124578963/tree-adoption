import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyTrees = () => {
    const [trees, setTrees] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!user) return;

        const fetchTrees = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/treeowner/my-trees",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "userToken"
                            )}`,
                        },
                    }
                );
                setTrees(response.data);
            } catch (error) {
                console.error("Error fetching trees:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrees();
    }, [user]);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h2 className="text-xl font-bold mb-4">
                    You are not logged in
                </h2>
                <p className="text-gray-600 mb-4">
                    Please log in to view your adopted trees.
                </p>
                <button
                    onClick={() => navigate("/login")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-center">
                My Adopted Trees
            </h1>
            {loading ? (
                <p className="text-center">Loading trees...</p>
            ) : trees.length === 0 ? (
                <p className="text-center text-gray-600">
                    No trees adopted yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trees.map((tree) => (
                        <div
                            key={tree.id}
                            className="bg-white p-4 rounded-lg shadow-md"
                        >
                            <h2 className="text-lg font-semibold">
                                {tree.treeName || "Unnamed Tree"}
                            </h2>
                            <p className="text-gray-600">
                                Type: {tree.treeType}
                            </p>
                            <p className="text-gray-600">
                                Planted on: {tree.plantingDate}
                            </p>
                            <p className="text-gray-600">
                                Location: {tree.location}
                            </p>
                            <img
                                src={tree.photoUrl}
                                alt="Tree"
                                className="w-full h-40 object-cover rounded mt-2"
                            />
                            <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                Upload Progress Photo
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyTrees;