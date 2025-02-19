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
      const response = await axios.get("https://treeplantadopt-springboot-production.up.railway.app/donations/all");
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
      const response = await axios.delete(`https://treeplantadopt-springboot-production.up.railway.app/donations/delete/${treeId}`);
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
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Adopt a Tree</h1>

      {/* Display Tree Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trees.map((tree) => (
          <div key={tree.id} className="relative bg-white p-4 rounded-lg shadow-md text-center transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className="relative group">
              <img
                src={`https://treeplantadopt-springboot-production.up.railway.app/files/donatetreeimg/images/${tree.imagePath}`}
                alt={tree.species}
                className="w-full h-64 object-cover rounded-md bg-gray-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity">
                <p className="text-lg font-semibold">{tree.species}</p>
                <p className="text-sm">Quantity: {tree.quantity}</p>
                <p className="text-sm">Available: {tree.available ? "Yes" : "No"}</p>
              </div>
            </div>
            <button
              onClick={() => handleAdopt(tree)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Adopt Me
            </button>
            {user.id === tree.donor.id && (
              <button
                onClick={() => handleDelete(tree.id)}
                className="mt-3 ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Adoption Form */}
      {selectedTree && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Adopt {selectedTree.species}</h2>

            {message && <p className="text-center text-green-600">{message}</p>}

            <label className="block text-gray-700">Requested Quantity:</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded-md mb-4"
              placeholder="Enter quantity"
              min="1"
              max={selectedTree.quantity}
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(e.target.value)}
              required
            />

            <button
              onClick={handleConfirmAdoption}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Adoption"}
            </button>

            <button
              onClick={() => setSelectedTree(null)}
              className="w-full mt-2 bg-gray-400 text-white py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adopttrees;