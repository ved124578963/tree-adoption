import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileSidebar from "../Components/ProfileSidebar";

const ProgressPhotos = () => {
  const { treeId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://treeplantadopt-springboot-production.up.railway.app/treescan/tree/${treeId}`
        );
        setPhotos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching progress photos:", error);
        setError("Error fetching progress photos. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    console.log(treeId);
    fetchPhotos();
  }, [treeId]);

  const handleShowStatus = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-6 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-center">Progress Photos</h1>
        {loading ? (
          <p className="text-center">Loading photos...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : photos.length === 0 ? (
          <p className="text-center text-gray-600">
            No progress photos available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={`https://treeplantadopt-springboot-production.up.railway.app/files/treescan/images/${photo.treeScanImg}`}
                  alt={`Progress ${index + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => handleShowStatus(photo)}
                >
                  Show Status
                </button>
                <p>
                  <strong className="ml-3">Scan Date:</strong>
                  {photo.scanDate}
                </p>
              </div>
            ))}
          </div>
        )}
        {selectedPhoto && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Tree Status</h2>
            <p>
              <strong>Scan Time:</strong> {selectedPhoto.scanTime}
            </p>
            <p>
              <strong>Longitude:</strong> {selectedPhoto.longitude}
            </p>
            <p>
              <strong>Latitude:</strong> {selectedPhoto.latitude}
            </p>
            <p>
              <strong>Tree Health Status:</strong>{" "}
              {selectedPhoto.treeHealthStatus}
            </p>
            <p>
              <strong>Leaf Color:</strong> {selectedPhoto.leafColor}
            </p>
            <p>
              <strong>Leaf Density:</strong> {selectedPhoto.leafDensity}
            </p>
            <p>
              <strong>Trunk Diameter:</strong> {selectedPhoto.trunkDiameter}
            </p>
            <p>
              <strong>Canopy Diameter:</strong> {selectedPhoto.canopyDiameter}
            </p>
            <p>
              <strong>Growth Rate:</strong> {selectedPhoto.growthRate}
            </p>
            <p>
              <strong>Disease Detection:</strong>{" "}
              {selectedPhoto.diseaseDetection}
            </p>
            <p>
              <strong>Soil Moisture:</strong> {selectedPhoto.soilMoisture}
            </p>
            <p>
              <strong>Chlorophyll Content:</strong>{" "}
              {selectedPhoto.chlorophyllContent}
            </p>
            <p>
              <strong>Temperature:</strong> {selectedPhoto.temperature}
            </p>
            <p>
              <strong>Humidity:</strong> {selectedPhoto.humidity}
            </p>
            <p>
              <strong>Carbon Absorption:</strong>{" "}
              {selectedPhoto.carbonAbsorption}
            </p>
            <p>
              <strong>Oxygen Production:</strong>{" "}
              {selectedPhoto.oxygenProduction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPhotos;
