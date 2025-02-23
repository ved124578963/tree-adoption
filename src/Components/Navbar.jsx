import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear session storage
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo / Website Name */}
        <Link to="/" className="text-xl font-bold text-green-600">
          🌿 AdopTree
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link
            to="/"
            className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded"
          >
            Home
          </Link>
          <Link
            to="/Adopttrees"
            className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded"
          >
            Adopt Tree
          </Link>
          <Link
            to="/Leaderboard"
            className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded"
          >
            Leaderboard
          </Link>
          <Link
            to="/Social"
            className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded"
          >
            Social
          </Link>
          {user && (
            <>
              <Link
                to="/profile"
                className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:bg-green-600 hover:text-white px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md absolute w-full left-0 top-12 py-4">
          <Link
            to="/"
            className="block px-6 py-2 text-gray-700 hover:bg-green-600 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/Adopttrees"
            className="block px-6 py-2 text-gray-700 hover:bg-green-600 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Adopt Tree
          </Link>
          <Link
            to="/Leaderboard"
            className="block px-6 py-2 text-gray-700 hover:bg-green-600 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Leaderboard
          </Link>
          <Link
            to="/Social"
            className="block px-6 py-2 text-gray-700 hover:bg-green-600 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            Social
          </Link>
          {user && (
            <>
              <Link
                to="/profile"
                className="block px-6 py-2 text-gray-700 hover:bg-green-600 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block px-6 py-2 text-gray-700 hover:bg-green-600 hover:text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
