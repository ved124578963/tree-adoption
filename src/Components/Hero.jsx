import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

  const handleRegisterTree = () => {
    if (user) {
      navigate("/Registertree");
    } else {
      alert("You must be logged in to Donate a tree.");
      navigate("/login");
    }
  };
  const handleDonaterTree = () => {
    if (user) {
      navigate("/Donatetree");
    } else {
      alert("You must be logged in to register a tree.");
      navigate("/login");
    }
  };

  return (
    <section className="relative bg-green-100 py-20 text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          Adopt a Tree, Make a Difference! 🌱
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Join our mission to create a greener planet by adopting and tracking the growth of your own tree.
        </p>
        <div className="flex flex-col items-center space-y-4 mt-6">
          <button 
            onClick={handleRegisterTree} 
            className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Register a Tree
          </button>
          <button
            onClick={handleDonaterTree}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Donate a Tree 🌱
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;