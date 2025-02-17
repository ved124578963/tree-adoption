import { useState, useEffect } from "react";
import axios from "axios";

const Adopttrees = () => {
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);

  useEffect(() => {
    axios.get("https://treeplantadopt-springboot-production.up.railway.app/donations/all")
      .then(response => setTrees(response.data))
      .catch(error => console.error("Error fetching trees:", error));
  }, []);

  const handleAdopt = (tree) => {
    setSelectedTree(tree);
  };

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
                className="w-full h-56 object-cover rounded-md"
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
          </div>
        ))}
      </div>

      {/* Show Form if a Tree is Selected */}
      {selectedTree && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Adopt {selectedTree.species}</h2>

            <label className="block text-gray-700">Enter Your Name:</label>
            <input type="text" className="w-full px-3 py-2 border rounded-md mb-4" placeholder="Your Name" />

            <label className="block text-gray-700">Email:</label>
            <input type="email" className="w-full px-3 py-2 border rounded-md mb-4" placeholder="Your Email" />

            <label className="block text-gray-700">Phone Number:</label>
            <input type="tel" className="w-full px-3 py-2 border rounded-md mb-4" placeholder="Your Phone Number" />

            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Confirm Adoption
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adopttrees;
