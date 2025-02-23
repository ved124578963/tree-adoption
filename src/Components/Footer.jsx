import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-8 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Website Name & Logo */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-3xl font-bold">🌿 AdopTree</h2>
          <p className="text-sm opacity-80">
            Adopt a tree, track its growth, and make a difference.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-8 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link
            to="/Adopttrees"
            className="hover:text-yellow-400 transition-colors"
          >
            Adopt Tree
          </Link>
          <Link
            to="/Feedback"
            className="hover:text-yellow-400 transition-colors"
          >
            Feedback
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm opacity-80 mt-6 md:mt-0">
          © {new Date().getFullYear()} Tree Adoption. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
