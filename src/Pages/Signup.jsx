import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        dateOfBirth: "",
        country: "",
        state: "",
        district: "", 
        taluka: "",
        village: "",
        pincode: "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const validateFields = async () => {
        const errors = {};
        try {
            // Check username
            if (formData.username) {
                const usernameResponse = await axios.get(
                    `https://treeplantadopt-springboot-production.up.railway.app/validate/username?username=${formData.username}`
                );
                if (usernameResponse.data) {
                    errors.username = "Username already exists.";
                }
            }

            // Check mobile number
            if (formData.mobileNumber) {
                const mobileResponse = await axios.get(
                    `https://treeplantadopt-springboot-production.up.railway.app/validate/mobile?mobileNumber=${formData.mobileNumber}`
                );
                if (mobileResponse.data) {
                    errors.mobileNumber = "Mobile number already exists.";
                }
            }

            // Check email
            if (formData.email) {
                const emailResponse = await axios.get(
                    `https://treeplantadopt-springboot-production.up.railway.app/validate/email?email=${formData.email}`
                );
                if (emailResponse.data) {
                    errors.email = "Email already exists.";
                }
            }
        } catch (err) {
            console.error("Validation error:", err);
            errors.global = "Validation failed. Please try again later.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const isValid = await validateFields();
        if (!isValid) return;

        const formDataWithImage = new FormData();
        formDataWithImage.append(
            "treeOwner",
            new Blob([JSON.stringify(formData)], { type: "application/json" })
        );
        formDataWithImage.append("image", profileImage);

        try {
            const response = await axios.post(
                "https://treeplantadopt-springboot-production.up.railway.app/treeowner/registerowner",
                formDataWithImage,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status === 200) {
                setSuccess("Account created successfully!");
                setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
            }
        } catch (err) {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Create Account
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && (
                    <p className="text-green-500 text-center">{success}</p>
                )}

                <form onSubmit={handleSignup}>
                    {Object.keys(formData).map((field, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 capitalize">
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                type={
                                    field === "password"
                                        ? "password"
                                        : field === "dateOfBirth"
                                        ? "date"
                                        : "text"
                                }
                                name={field}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 ${
                                    validationErrors[field] && "border-red-500"
                                }`}
                                placeholder={`Enter ${field.replace(
                                    /([A-Z])/g,
                                    " $1"
                                )}`}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                            {validationErrors[field] && (
                                <p className="text-red-500 text-sm">
                                    {validationErrors[field]}
                                </p>
                            )}
                        </div>
                    ))}

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-blue-500 hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
