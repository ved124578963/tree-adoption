import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Donatetree = () => {
  const [formData, setFormData] = useState({
    species: "",
    quantity: "",
  });
  const [treeImage, setTreeImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setTreeImage(e.target.files[0]);
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const donorId = JSON.parse(localStorage.getItem("user"))?.id;
    console.log(donorId);
    if (!donorId) {
      setError("Donor ID not found. Please log in.");
      return;
    }

    const formDataWithImage = new FormData();
    formDataWithImage.append("donorId", donorId);
    formDataWithImage.append("species", formData.species);
    formDataWithImage.append("quantity", formData.quantity);
    formDataWithImage.append("image", treeImage);
    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/donations/donate",
        formDataWithImage,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setSuccess("Tree donation successful!");
        setTimeout(() => navigate("/"), 2000); // Redirect to thank you page after success
      }
    } catch (err) {
      setError("Donation failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Donate a Tree</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleDonate}>
          <div className="mb-4">
            <label className="block text-gray-700">Species</label>
            <input
              type="text"
              name="species"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter tree species"
              value={formData.species}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Tree Image</label>
            <input
              type="file"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleImageChange}
              required
            />
          </div>

          <button
            type="submit"
            className=" w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donatetree;
