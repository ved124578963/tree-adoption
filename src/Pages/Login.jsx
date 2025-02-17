import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Login Component is Mounted");
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "https://treeplantadopt-springboot-production.up.railway.app/treeowner/login",
                {
                    username,
                    password,
                }
            );

            if (response.status === 200) {
                localStorage.setItem("user", JSON.stringify(response.data));
                navigate("/");
            }
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Tree Owner Login
                </h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4 relative">
                        <label className="block text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 pr-10"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                onClick={togglePasswordVisibility}
                                tabIndex={-1}
                                style={{ height: '100%' }} // Ensures the button spans the full height of the input
                            >
                                {isPasswordVisible ? (
                                    <FaEye className="h-5 w-5" />
                                ) : (
                                    <FaRegEyeSlash className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="text-right mb-4">
                        <Link
                            to="/Forgotpassword"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-blue-500 hover:underline"
                    >
                        Create one
                    </Link>
                </p>

                <p className="text-center text-gray-600 mt-4">
                    Login as Admin?{" "}
                    <Link
                        to="/Adminlogin"
                        className="text-red-500 hover:underline"
                    >
                        Click here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
