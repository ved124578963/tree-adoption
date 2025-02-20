import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-green-700 text-white p-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">

        {/* Website Name & Logo */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">🌿 Tree Adoption</h2>
          <p className="text-sm">Adopt a tree, track its growth, and make a difference.</p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/Adopttrees" className="hover:underline">
            Adopt Tree
          </Link>

          <Link to="/Feedback" className="hover:underline">
            Feedback
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm mt-4 md:mt-0">© {new Date().getFullYear()} Tree Adoption. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;