import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
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
          <button className="px-6 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition">
            Adopt a Tree
          </button>
          <button
            onClick={() => navigate("/Donatetree")}
            className="px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            Donate a Tree 🌱
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
