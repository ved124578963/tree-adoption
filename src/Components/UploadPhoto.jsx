import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SchemaType = {
    ARRAY: "array",
    OBJECT: "object",
    STRING: "string",
};
const schema = {
    description: "Details of Plant",
    type: SchemaType.ARRAY,
    items: {
        type: SchemaType.OBJECT,
        properties: {
            PlantName: {
                type: SchemaType.STRING,
                description: "Name of the Plant",
                nullable: false,
            },
            WateringFrequency: {
                type: SchemaType.STRING,
                description:
                    "How often the plant needs water (e.g., daily, weekly)",
                nullable: false,
            },
            SoilRequired: {
                type: SchemaType.STRING,
                description:
                    "Type of soil required for the plant(e.g Sandy, loamy, clay, or well-draining soil)",
                nullable: false,
            },
            GrowthRate: {
                type: SchemaType.STRING,
                description: "Name of the Plant",
                nullable: false,
            },
            SunlightDuration: {
                type: SchemaType.STRING,
                description: "Number of hours the plant needs light each day",
                nullable: false,
            },
        },
        required: [
            "PlantName",
            "WateringFrequency",
            "SoilRequired",
            "GrowthRate",
            "SunlightDuration",
        ],
    },
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
If you can't determine the plant name, set PlantName to 'unknown'.
`;
function fileToGenerativePart(base64Data, mimeType) {
    return {
        inlineData: {
            data: base64Data,
            mimeType,
        },
    };
}

const UploadPhoto = () => {
    const [image, setImage] = useState(null);
    let [generatedContent, setGeneratedContent] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem("user"));

    // Handle Image Selection
    const handleImageCapture = (event) => {
        const file = event.target.files[0]; // Get selected image file
        if (file) {
            setImage(URL.createObjectURL(file)); // Create a preview URL

            // Use FileReader to read the file and convert to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result.split(",")[1];
                const fileData = [
                    fileToGenerativePart(base64String, file.type),
                ];
                const content = await model.generateContent([
                    prompt,
                    ...fileData,
                ]);
                setGeneratedContent(content);
                const response = content.response.text(); // Get the raw text response
                const jsonData = JSON.parse(response); // Parse the text into JSON
                console.log(jsonData, typeof jsonData); // Now you have it in JSON format
                console.log(jsonData[0]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold mb-2">Capture Photo</h2>

            {/* Show message & login button if user is not authenticated */}
            {!user ? (
                <div className="text-center p-4">
                    <p className="text-red-500">
                        You must be logged in to upload a photo.
                    </p>
                    <button
                        onClick={() => navigate("/login")}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Login
                    </button>
                </div>
            ) : (
                <>
                    {/* Capture Photo Button (Visible Only to Authenticated Users) */}
                    <label className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Capture Photo 📷
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment" // Opens back camera by default
                            className="hidden"
                            onChange={handleImageCapture}
                        />
                    </label>

                    {/* Show Captured Image Preview */}
                    {image && (
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold">
                                Captured Image:
                            </h3>
                            <img
                                src={image}
                                alt="Captured"
                                className="w-64 h-48 rounded-lg border-2 border-gray-300 mt-2"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UploadPhoto;
