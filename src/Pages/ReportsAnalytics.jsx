import { useState, useEffect } from "react";
import AdminSidebar from "../Components/AdminSidebar";
import axios from "axios";

const AdminTrees = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Reports and Analytics</h1>
      </div>
    </div>
  );
};

export default AdminTrees;
