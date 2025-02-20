import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear session storage
        navigate("/"); // Redirect to login page
    };

    return (
        <nav className="bg-green-600 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                {/* Logo / Website Name */}
                <Link to="/" className="text-2xl font-bold">
                    🌿 Tree Adoption
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <Link to="/Adopttrees" className="hover:underline">
                        Adopt Tree
                    </Link>

                    <Link to="/Leaderboard" className="hover:underline">
                        Leaderboard
                    </Link>
                    <Link to="/Eventlist" className="hover:underline">
                        Events
                    </Link>
                    <Link to="/Social" className="hover:underline">
                        Social
                    </Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="hover:underline">
                                Profile
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-green-600 px-4 py-1 rounded-lg hover:bg-gray-200"
                        >
                            Login / Register
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden"
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center mt-2 space-y-2 bg-green-700 p-4">
                    <Link
                        to="/"
                        className="hover:underline"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/Adopttrees"
                        className="hover:underline"
                        onClick={() => setIsOpen(false)}
                    >
                        Adopt Tree
                    </Link>
                    <Link
                        to="/leaderboard"
                        className="hover:underline"
                        onClick={() => setIsOpen(false)}
                    >
                        Leaderboard
                    </Link>
                    <Link to="/Eventlist" className="hover:underline">
                        Events
                    </Link>
                    <Link to="/Social" className="hover:underline">
                        Social
                    </Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="hover:underline">
                                Profile
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-white text-green-600 px-4 py-1 rounded-lg hover:bg-gray-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Login / Register
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
