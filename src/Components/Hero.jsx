import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleRegisterTreeClick = () => {
    navigate("/registertree");
  };

  const handleDonateTreeClick = () => {
    navigate("/donatetree");
  };

  return (
    <section className="bg-green-100 h-screen md:h-screen flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-16">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="text-black">Be a hero and protect </span>
          <span className="text-green-700">Nature</span>
        </h1>
        <p className="mt-4 text-gray-700 max-w-lg mx-auto md:mx-0">
          Join us in protecting the environment—every small action, like
          planting trees or reducing waste, helps create a greener future.
          Together, we can make a lasting impact! 🌿
        </p>
        <div className="mt-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          {isLoggedIn ? (
            <>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleRegisterTreeClick}
              >
                Register Tree
              </button>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={handleDonateTreeClick}
              >
                Donate Tree
              </button>
            </>
          ) : (
            <>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={handleLoginClick}
              >
                Login
              </button>
              <button
                className="px-6 py-2 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-100"
                onClick={handleSignupClick}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1461230185679-aad82a673415?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJlZSUyMGxlYXZlc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Nature"
          className="w-full h-2xl  shadow-lg rounded-full"
        />
      </div>
    </section>
  );
};

export default Hero;
