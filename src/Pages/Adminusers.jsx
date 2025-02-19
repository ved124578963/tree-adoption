import { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const Adminusers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = () => {
    axios.get(`https://treeplantadopt-springboot-production.up.railway.app/admin/getowners`)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  };

  const searchUserById = (id) => {
    if (!id) {
      fetchUsers();
      return;
    }
    axios.get(`https://treeplantadopt-springboot-production.up.railway.app/admin/${id}`)
      .then(response => setUsers([response.data]))
      .catch(error => console.error("Error searching user:", error));
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        
        <input
          type="text"
          placeholder="Search user by ID..."
          className="border p-2 rounded mb-4 w-full"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            searchUserById(e.target.value);
          }}
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Id</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">FirstName</th>
              <th className="border p-2">MiddleName</th>
              <th className="border p-2">LastName</th>
              <th className="border p-2">TotalTrees</th>
              <th className="border p-2">TotalRewards</th>
              <th className="border p-2">MobileNumber</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.username}</td>
                <td className="border p-2">{user.firstName}</td>
                <td className="border p-2">{user.middleName}</td>
                <td className="border p-2">{user.lastName}</td>
                <td className="border p-2">{user.totalTrees}</td>
                <td className="border p-2">{user.totalRewards}</td>
                <td className="border p-2">{user.mobileNumber}</td>
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
    </div>
  );
};

export default Adminusers;
