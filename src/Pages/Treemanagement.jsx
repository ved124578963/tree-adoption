import { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const Treemanagement = () => {
  const [trees, setTrees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://your-backend-api.com/api/trees")
      .then(response => setTrees(response.data))
      .catch(error => console.error("Error fetching trees:", error));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Tree Management</h1>
        
        <input
          type="text"
          placeholder="Search trees..."
          className="border p-2 rounded mb-4 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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
            </tr>
          </thead>
          <tbody>
            {trees.filter(tree => tree.name.toLowerCase().includes(search.toLowerCase()))
              .map(tree => (
                <tr key={tree.id} className="border">
                  <td className="border p-2">{tree.id}</td>
                  <td className="border p-2">{tree.name}</td>
                  <td className="border p-2">{tree.treeType}</td>
                  <td className="border p-2">{tree.registeredDate}</td>
                  <td className="border p-2">{tree.longitude}</td>
                  <td className="border p-2">{tree.latitude}</td>
                  <td className="border p-2">{tree.rewards}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Treemanagement;
