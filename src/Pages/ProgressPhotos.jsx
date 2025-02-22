import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileSidebar from "../Components/ProfileSidebar";

const ProgressPhotos = () => {
  const { treeId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          `https://treeplantadopt-springboot-production.up.railway.app/treescan/tree/${treeId}`
        );
        setPhotos(response.data);
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
          <p className="text-center text-gray-600">No progress photos available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={`https://treeplantadopt-springboot-production.up.railway.app/files/treescan/images/${photo}`}
                  alt={`Progress ${index + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPhotos;