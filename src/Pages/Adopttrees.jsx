import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Adopttrees = () => {
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);
  const [requestedQuantity, setRequestedQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Get logged-in user info
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchTreeData();
  }, []);

  const fetchTreeData = async () => {
    try {
      const response = await axios.get(
        "https://treeplantadopt-springboot-production.up.railway.app/donations/all"
      );
      setTrees(response.data);
    } catch (error) {
      console.error("Error fetching trees:", error);
    }
  };

  const handleAdopt = (tree) => {
    setSelectedTree(tree);
    setRequestedQuantity(1); // Reset requested quantity
    setMessage(""); // Clear previous messages
  };

  const handleConfirmAdoption = async () => {
    if (!user) {
      alert("You must be logged in to adopt a tree.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    const requestData = {
      requester: { id: user.id }, // User who wants to adopt
      donation: { id: selectedTree.id }, // Tree donation ID
      requestedQuantity: requestedQuantity, // User-selected quantity
    };

    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/requests/request",
        requestData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        setMessage("Adoption request sent successfully!");
        setSelectedTree(null); // Close the form after success
        // Fetch the updated tree data
        fetchTreeData();
      } else {
        setMessage("Failed to send adoption request.");
      }
    } catch (error) {
      setMessage("Error occurred while processing your request.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (treeId) => {
    try {
      const response = await axios.delete(
        `https://treeplantadopt-springboot-production.up.railway.app/donations/delete/${treeId}`
      );
      if (response.status === 200) {
        setMessage("Donation deleted successfully!");
        // Remove the deleted tree from the state
        setTrees((prevTrees) => prevTrees.filter((tree) => tree.id !== treeId));
      } else {
        setMessage("Failed to delete donation.");
      }
    } catch (error) {
      setMessage("Error occurred while deleting the donation.");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">You are not logged in</h2>
        <p className="text-gray-600 mb-4">Please log in to adopt a tree.</p>
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
    <div className="bg-green-100 mt-15 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Adopt a Tree
        </h1>

        {/* Display Tree Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trees.map((tree) => (
            <div
              key={tree.id}
              className="bg-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div className="relative p-4">
                <img
                  src={`https://treeplantadopt-springboot-production.up.railway.app/files/donatetreeimg/images/${tree.imagePath}`}
                  alt={tree.species}
                  className="w-full h-64 object-contain bg-white p-2 rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col items-center justify-center opacity-0 hover:opacity-60 transition-opacity duration-300">
                  <p className="text-lg font-semibold">{tree.species}</p>
                  <p className="text-sm">Quantity: {tree.quantity}</p>
                  <p className="text-sm">
                    Available: {tree.available ? "Yes" : "No"}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() => handleAdopt(tree)}
                  className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Adopt Me
                </button>
                {user.id === tree.donor.id && (
                  <button
                    onClick={() => handleDelete(tree.id)}
                    className="w-full mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Adoption Form */}
        {selectedTree && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">
                Adopt {selectedTree.species}
              </h2>

              {message && (
                <p className="text-center text-green-600">{message}</p>
              )}

              <label className="block text-gray-700 text-sm font-bold mb-2">
                Requested Quantity:
              </label>
              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter quantity"
                min="1"
                max={selectedTree.quantity}
                value={requestedQuantity}
                onChange={(e) => setRequestedQuantity(e.target.value)}
                required
              />

              <button
                onClick={handleConfirmAdoption}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Adoption"}
              </button>

              <button
                onClick={() => setSelectedTree(null)}
                className="w-full mt-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adopttrees;
