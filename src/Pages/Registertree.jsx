import { useState, useRef, useEffect } from "react";
import axios from "axios";

const Registertree = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    longitude: "",
    latitude: "",
    treeOwner: { id: "" },
  });

  const [isPhotoButtonEnabled, setIsPhotoButtonEnabled] = useState(false);
  const [photo, setPhoto] = useState(null); // Store captured photo
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.id) {
      setFormData((prevData) => ({
        ...prevData,
        treeOwner: { id: user.id },
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setIsPhotoButtonEnabled(
        updatedData.name.trim() !== "" && updatedData.type.trim() !== ""
      );
      return updatedData;
    });
  };

  const getLocationAfterPhoto = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevData) => ({
            ...prevData,
            longitude: position.coords.longitude.toFixed(15),
            latitude: position.coords.latitude.toFixed(15),
          }));
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert(
            "Unable to retrieve location. Please enable location services."
          );
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handlePhotoSelection = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      alert("Photo selected successfully! Now fetching location...");
      getLocationAfterPhoto();
    }
  };

  const handleCapturePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.type ||
      !formData.longitude ||
      !formData.latitude ||
      !photo
    ) {
      setError("Please complete all fields before submitting.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id) {
      setError("User ID not found. Please log in.");
      return;
    }

    const treeData = {
      name: formData.name,
      type: formData.type,
      longitude: parseFloat(formData.longitude),
      latitude: parseFloat(formData.latitude),
      treeOwner: { id: user.id },
    };

    const formDataWithImage = new FormData();
    formDataWithImage.append(
      "tree",
      new Blob([JSON.stringify(treeData)], { type: "application/json" })
    );
    formDataWithImage.append("image", photo, "tree_image.png");

    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/trees/registertree",
        formDataWithImage,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to register tree.");
      }
      setSuccess("Tree registered successfully!");
      setFormData({
        name: "",
        type: "",
        longitude: "",
        latitude: "",
        treeOwner: { id: "" },
      });
      setPhoto(null);
    } catch (error) {
      console.error("Error:", error);
      setError("Error registering tree. Please try again.");
    }
  };

  return (
    <section className="py-16 bg-green-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-4">
            Register a New Tree
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Tree Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter tree name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Tree Type</label>
              <input
                type="text"
                name="type"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter tree type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Capture Photo</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                ref={fileInputRef}
                onChange={handlePhotoSelection}
              />
              <button
                type="button"
                className={`w-full flex items-center justify-center gap-2 py-2 rounded mb-3 text-white ${
                  isPhotoButtonEnabled
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={handleCapturePhotoClick}
                disabled={!isPhotoButtonEnabled}
              >
                Capture Photo
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Longitude</label>
              <input
                type="text"
                name="longitude"
                className="w-full px-3 py-2 border rounded-md"
                placeholder=""
                value={formData.longitude}
                readOnly
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Latitude</label>
              <input
                type="text"
                name="latitude"
                className="w-full px-3 py-2 border rounded-md"
                placeholder=""
                value={formData.latitude}
                readOnly
              />
            </div>
            {photo && (
              <div className="mb-3 mt-0">
                <p className="text-center text-sm text-gray-600">
                  Captured Photo:
                </p>
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Captured"
                  className="w-full rounded-md border"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
            >
              Register Tree
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registertree;
