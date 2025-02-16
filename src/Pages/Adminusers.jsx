import { useState, useEffect } from "react";
import axios from "axios";

const Adminusers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    axios.get(`https://treeplantadopt-springboot-production.up.railway.app/admin/users?t=${Date.now()}`)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios.delete(`https://treeplantadopt-springboot-production.up.railway.app/treeowner/${userId}`)
        .then(() => setUsers(users.filter(user => user.id !== userId)))
        .catch(error => console.error("Error deleting user:", error));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <button 
        onClick={fetchUsers} 
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mb-4"
      >
        Refresh Users
      </button>
      
      <input
        type="text"
        placeholder="Search users..."
        className="border p-2 rounded mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            .map(user => (
              <tr key={user.id} className="border">
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminusers;
