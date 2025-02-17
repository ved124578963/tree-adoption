import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTreesAdopted, setTotalTreesAdopted] = useState(0);

  useEffect(() => {
    axios.get("https://treeplantadopt-springboot-production.up.railway.app/treeowners-count")
      .then(response => setTotalUsers(response.data))
      .catch(error => console.error("Error fetching total users:", error));

    axios.get("https://treeplantadopt-springboot-production.up.railway.app/trees-count")
      .then(response => setTotalTreesAdopted(response.data))
      .catch(error => console.error("Error fetching total trees adopted:", error));
  }, []);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-2xl font-bold text-green-600">{totalUsers}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Trees Adopted</h2>
            <p className="text-2xl font-bold text-green-600">{totalTreesAdopted}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Active Users</h2>
            <p className="text-2xl font-bold text-green-600">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Photos Uploaded</h2>
            <p className="text-2xl font-bold text-green-600">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Rewards Distributed</h2>
            <p className="text-2xl font-bold text-green-600">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Most Adopted Tree Species</h2>
            <p className="text-2xl font-bold text-green-600">Banyan Tree</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
