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
        localStorage.setItem("userToken", response.data.token);
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
    <section className="py-16 bg-green-100">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-11/12 sm:w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Tree Owner Login
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
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
                  style={{ height: "100%" }} // Ensures the button spans the full height of the input
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create one
            </Link>
          </p>

          <p className="text-center text-gray-600 mt-4">
            Login as Admin?{" "}
            <Link to="/Adminlogin" className="text-red-500 hover:underline">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
