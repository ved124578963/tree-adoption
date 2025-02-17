import { useState } from "react";
import UploadPhoto from "../Components/UploadPhoto";

const RegisterTreeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    longitude: "",
    latitude: "",
    treeOwner: {
      id: "",
    },
  });

  const handleChange = (e) => {
    if (e.target.name === "treeOwnerId") {
      setFormData({ ...formData, treeOwner: { id: e.target.value } });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tree Registered:", formData);
    alert("Tree registered successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register a New Tree</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Tree Name"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Tree Type"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <UploadPhoto />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.longitude}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.latitude}
            onChange={handleChange}
            required
          />


          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Register Tree
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTreeForm;
