import { useState, useEffect } from "react";
import axios from "axios";

const Adopttrees = () => {
  const [trees, setTrees] = useState([]);
  const [selectedTree, setSelectedTree] = useState(null);

  useEffect(() => {
    // Fetch tree types from API (Use dummy data for now)
    setTrees([
      { id: 1, name: "Mango Tree", image: "/images/mango.jpg" },
      { id: 2, name: "Neem Tree", image: "/images/neem.jpg" },
      { id: 3, name: "Banyan Tree", image: "/images/banyan.jpg" },
      { id: 4, name: "Banyan Tree", image: "/images/banyan.jpg" },
      { id: 5, name: "Banyan Tree", image: "/images/banyan.jpg" },
      { id: 6, name: "Banyan Tree", image: "/images/banyan.jpg" },
    ]);
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
          <div key={tree.id} className="bg-white p-4 rounded-lg shadow-md text-center">
            <img src={tree.image} alt={tree.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{tree.name}</h2>
            <button 
              onClick={() => handleAdopt(tree)}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
            <h2 className="text-xl font-bold mb-4">Adopt {selectedTree.name}</h2>
            
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
