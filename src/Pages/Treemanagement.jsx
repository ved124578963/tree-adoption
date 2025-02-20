import { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const Treemanagement = () => {
  const [trees, setTrees] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    axios.get("https://treeplantadopt-springboot-production.up.railway.app/trees/gettrees")
      .then(response => setTrees(response.data))
      .catch(error => console.error("Error fetching trees:", error));
  }, []);

  const handleDelete = async (treeId) => {
    try {
      await axios.delete(`https://treeplantadopt-springboot-production.up.railway.app/trees/${treeId}`);
      setTrees(trees.filter(tree => tree.id !== treeId));
    } catch (error) {
      console.error("Error deleting tree:", error);
    }
  };

  const handleSearch = async () => {
    if (!search) {
      setSearchResult(null);
      return;
    }

    try {
      const response = await axios.get(`https://treeplantadopt-springboot-production.up.railway.app/trees/${search}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error searching tree:", error);
      setSearchResult(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Tree Management</h1>
        
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search tree by ID..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Tree Type</th>
              <th className="border p-2">Registered Date</th>
              <th className="border p-2">Longitude</th>
              <th className="border p-2">Latitude</th>
              <th className="border p-2">Rewards</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchResult ? (
              <tr key={searchResult.id} className="border">
                <td className="border p-2">{searchResult.id}</td>
                <td className="border p-2">{searchResult.name}</td>
                <td className="border p-2">{searchResult.type}</td>
                <td className="border p-2">{searchResult.registeredDate}</td>
                <td className="border p-2">{searchResult.longitude}</td>
                <td className="border p-2">{searchResult.latitude}</td>
                <td className="border p-2">{searchResult.rewards}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(searchResult.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : (
              trees.filter(tree => tree.name.toLowerCase().includes(search.toLowerCase()))
                .map(tree => (
                  <tr key={tree.id} className="border">
                    <td className="border p-2">{tree.id}</td>
                    <td className="border p-2">{tree.name}</td>
                    <td className="border p-2">{tree.type}</td>
                    <td className="border p-2">{tree.registeredDate}</td>
                    <td className="border p-2">{tree.longitude}</td>
                    <td className="border p-2">{tree.latitude}</td>
                    <td className="border p-2">{tree.rewards}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDelete(tree.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Treemanagement;