import { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const Treemanagement = () => {
  const [trees, setTrees] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://treeplantadopt-springboot-production.up.railway.app/trees/gettrees"
      )
      .then((response) => setTrees(response.data))
      .catch((error) => console.error("Error fetching trees:", error));
  }, []);

  const handleDelete = async (treeId) => {
    try {
      await axios.delete(
        `https://treeplantadopt-springboot-production.up.railway.app/trees/${treeId}`
      );
      setTrees(trees.filter((tree) => tree.id !== treeId));
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
      const response = await axios.get(
        `https://treeplantadopt-springboot-production.up.railway.app/trees/${search}`
      );
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error searching tree:", error);
      setSearchResult(null);
    }
  };

  return (
    <div className="flex min-h-screen mt-15 bg-green-100">
      <AdminSidebar />
      <div className="flex-1 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
          Tree Management
        </h1>

        <div className="flex mb-4 w-full max-w-4xl">
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

        <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <table className="w-full border-collapse text-gray-700">
            <thead className="bg-green-700 text-white text-lg">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Tree Type</th>
                <th className="p-4">Registered Date</th>
                <th className="p-4">Longitude</th>
                <th className="p-4">Latitude</th>
                <th className="p-4">Rewards</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {searchResult ? (
                <tr
                  key={searchResult.id}
                  className="bg-white hover:bg-gray-200"
                >
                  <td className="p-4 text-center">{searchResult.id}</td>
                  <td className="p-4 text-center">{searchResult.name}</td>
                  <td className="p-4 text-center">{searchResult.type}</td>
                  <td className="p-4 text-center">
                    {searchResult.registeredDate}
                  </td>
                  <td className="p-4 text-center">{searchResult.longitude}</td>
                  <td className="p-4 text-center">{searchResult.latitude}</td>
                  <td className="p-4 text-center">{searchResult.rewards}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(searchResult.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : (
                trees.map((tree, index) => (
                  <tr
                    key={tree.id}
                    className={
                      index % 2 === 0
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-white hover:bg-gray-200"
                    }
                  >
                    <td className="p-4 text-center">{tree.id}</td>
                    <td className="p-4 text-center">{tree.name}</td>
                    <td className="p-4 text-center">{tree.type}</td>
                    <td className="p-4 text-center">{tree.registeredDate}</td>
                    <td className="p-4 text-center">{tree.longitude}</td>
                    <td className="p-4 text-center">{tree.latitude}</td>
                    <td className="p-4 text-center">{tree.rewards}</td>
                    <td className="p-4 text-center">
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
    </div>
  );
};

export default Treemanagement;
