import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfileSidebar from "../Components/ProfileSidebar";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SchemaType = {
  ARRAY: "array",
  OBJECT: "object",
  STRING: "string",
};

const schema = {
  description: "Details of Plant",
  type: SchemaType.OBJECT,
  properties: {
    treeHealthStatus: {
      type: SchemaType.STRING,
      description: "Health status of the tree",
      nullable: false,
    },
    leafColor: {
      type: SchemaType.STRING,
      description: "Color of the leaves",
      nullable: false,
    },
    leafDensity: {
      type: "number",
      description: "Density of the leaves",
      nullable: false,
    },
    trunkDiameter: {
      type: "number",
      description: "Diameter of the trunk",
      nullable: false,
    },
    canopyDiameter: {
      type: "number",
      description: "Diameter of the canopy",
      nullable: false,
    },
    growthRate: {
      type: "number",
      description: "Growth rate of the tree",
      nullable: false,
    },
    pestInfestation: {
      type: SchemaType.STRING,
      description: "Presence of pest infestation",
      nullable: false,
    },
    diseaseDetection: {
      type: SchemaType.STRING,
      description: "Detection of any disease",
      nullable: false,
    },
    soilMoisture: {
      type: "number",
      description: "Moisture level of the soil",
      nullable: false,
    },
    chlorophyllContent: {
      type: "number",
      description: "Chlorophyll content in the leaves",
      nullable: false,
    },
    temperature: {
      type: "number",
      description: "Temperature around the tree",
      nullable: false,
    },
    humidity: {
      type: "number",
      description: "Humidity level around the tree",
      nullable: false,
    },
    carbonAbsorption: {
      type: "number",
      description: "Amount of carbon absorbed by the tree",
      nullable: false,
    },
    oxygenProduction: {
      type: "number",
      description: "Amount of oxygen produced by the tree",
      nullable: false,
    },
  },
  required: [
    "treeHealthStatus",
    "leafColor",
    "leafDensity",
    "trunkDiameter",
    "canopyDiameter",
    "growthRate",
    "pestInfestation",
    "diseaseDetection",
    "soilMoisture",
    "chlorophyllContent",
    "temperature",
    "humidity",
    "carbonAbsorption",
    "oxygenProduction",
  ],
};

const genAI = new GoogleGenerativeAI("AIzaSyCMhuhudG9S33XEF8ThLZYAFrrbK1ZVzLM");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});
const prompt = `
Analyze this plant image,
Be as accurate as possible in your assessment.
Determine the plant and give accurate values.
`;
function fileToGenerativePart(base64Data, mimeType) {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}

let lat2 = 0;
let lon2 = 0;
let treeid = 0;
const MyTrees = () => {
  const [trees, setTrees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTree, setSelectedTree] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchTrees = async () => {
      try {
        const response = await axios.get(
          `https://treeplantadopt-springboot-production.up.railway.app/trees/owner/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );

        const treesWithLocation = await Promise.all(
          response.data.map(async (tree) => {
            treeid = tree.id;
            const locationResponse = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${tree.latitude},${tree.longitude}&key=AIzaSyDzrvm7-DGybAq-SrgB16XyB1V9z4jpHzE`
            );
            const location =
              locationResponse.data.results[0]?.formatted_address ||
              "Location not found";
            return {
              ...tree,
              location,
            };
          })
        );

        setTrees(treesWithLocation);
      } catch (error) {
        console.error("Error fetching trees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, [user]);

  const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
    console.log(lat1, lon1, lat2, lon2);
    const R = 6371e3; // Radius of the Earth in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const handleFileSelection = (e) => {
    console.log("inside hanldeselction");
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      console.log("inside hanldeselction");
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(",")[1];
        const fileData = [fileToGenerativePart(base64String, file.type)];
        console.log("inside hanldeselction");
        const content = await model.generateContent([prompt, ...fileData]);
        const jsonData = JSON.parse(content.response.text());
        setGeneratedContent(jsonData);
        console.log(jsonData.treeHealthStatus);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = async (tree) => {
    treeid = tree.id;
    console.log(treeid);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          lat2 = position.coords.latitude.toFixed(15);
          lon2 = position.coords.longitude.toFixed(15);
          const distance = getDistanceFromLatLonInMeters(
            parseFloat(lat2),
            parseFloat(lon2),
            parseFloat(tree.latitude),
            parseFloat(tree.longitude),
            console.log(lon2, lat2, tree.longitude, tree.latitude)
          );

          console.log(distance);
          if (distance <= 2000) {
            setSelectedTree(tree);
            document.getElementById("fileInput").click();
            setTimeout(() => {
              setShowSubmitButton(true);
            }, 7000);
          } else {
            alert("You are not within the required range to upload a photo.");
          }
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

  const handleSubmitPhoto = async () => {
    if (!selectedFile || !selectedTree) {
      alert("No file selected or tree not specified.");
      return;
    }

    const updatedContent = {
      longitude: parseFloat(lon2),
      latitude: parseFloat(lat2),
      treeHealthStatus: generatedContent.treeHealthStatus,
      leafColor: generatedContent.leafColor,
      leafDensity: generatedContent.leafDensity,
      trunkDiameter: generatedContent.trunkDiameter,
      canopyDiameter: generatedContent.canopyDiameter,
      growthRate: generatedContent.growthRate,
      diseaseDetection: generatedContent.diseaseDetection,
      soilMoisture: generatedContent.soilMoisture,
      chlorophyllContent: generatedContent.chlorophyllContent,
      temperature: generatedContent.temperature,
      humidity: generatedContent.humidity,
      carbonAbsorption: generatedContent.carbonAbsorption,
      oxygenProduction: generatedContent.oxygenProduction,
      tree: {
        id: selectedTree.id,
      },
    };

    const formDataWithImage = new FormData();
    formDataWithImage.append(
      "treeScan",
      new Blob([JSON.stringify(updatedContent)], {
        type: "application/json",
      })
    );
    formDataWithImage.append("image", selectedFile, "tree_image.png");

    console.log(updatedContent);

    try {
      const response = await axios.post(
        `https://treeplantadopt-springboot-production.up.railway.app/treescan/registertreescan`,
        formDataWithImage,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to upload photo.");
      }
      alert("Photo and data uploaded successfully!");
      setShowSubmitButton(false);
    } catch (error) {
      console.error("Error uploading photo and data:", error);
      alert("Error uploading photo and data. Please try again.");
    }

    setSelectedFile(null);
    setSelectedTree(null);
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">You are not logged in</h2>
        <p className="text-gray-600 mb-4">
          Please log in to view your adopted trees.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-6 mt-15 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-center">My Trees</h1>
        {loading ? (
          <p className="text-center">Loading trees...</p>
        ) : trees.length === 0 ? (
          <p className="text-center text-gray-600">No trees adopted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trees.map((tree) => (
              <div key={tree.id} className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">
                  {tree.name || "Unnamed Tree"}
                </h2>
                <p className="text-gray-600">Type: {tree.type}</p>
                <p className="text-gray-600">
                  Planted on: {tree.registeredDate}
                </p>
                <p className="text-gray-600">Location: {tree.location}</p>
                <img
                  src={`https://treeplantadopt-springboot-production.up.railway.app/files/tree/images/${tree.treeImg}`}
                  alt="Tree"
                  className="w-full h-40 object-cover rounded mt-2"
                />
                <button
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  onClick={() => handleUploadPhoto(tree)}
                >
                  Upload Progress Photo
                </button>
                <button
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-7 items-center"
                  onClick={() => navigate(`/ProgressPhotos/${tree.id}`)}
                >
                  Show Progress
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelection}
        />
        {showSubmitButton && (
          <button
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleSubmitPhoto}
          >
            Submit Photo
          </button>
        )}
      </div>
    </div>
  );
};

export default MyTrees;
