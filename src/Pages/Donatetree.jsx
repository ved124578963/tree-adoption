import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Donatetree = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    treeName: "",
    quantity: "",
    treeImage: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "treeImage") {
      setFormData({ ...formData, treeImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tree Donation Data:", formData);
    alert("Thank you for your donation!");
    navigate("/"); // Redirect to home after submission
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Donate a Tree</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((field, index) => (
            field !== "treeImage" && (
              <div key={index} className="mb-4">
                <label className="block text-gray-700 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type={field === "email" ? "email" : field === "phone" ? "tel" : field === "quantity" ? "number" : "text"}
                  name={field}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required={field !== "treeImage"}
                  {...(field === "phone" ? { pattern: "[0-9]{10}", maxLength: "10" } : {})}
                />
              </div>
            )
          ))}

          <div className="mb-4">
            <label className="block text-gray-700">Upload Tree Image</label>
            <input
              type="file"
              name="treeImage"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Donate Tree
          </button>
        </form>
      </div>
    </div>
  );
};

export default Donatetree;
