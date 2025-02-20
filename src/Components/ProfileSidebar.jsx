import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, TreePine, Mail, List, LogOut } from "lucide-react";
import { BsCalendar2Event } from "react-icons/bs";

const ProfileSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    navigate("/login"); // Redirect to Login
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`h-screen bg-gray-800 text-white p-4 ${isOpen ? "w-64" : "w-16"} transition-all sticky top-0`}>
        <button onClick={() => setIsOpen(!isOpen)} className="mb-6 text-xl">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className="space-y-4">
          <li>
            <Link to="/Mytrees" className="flex items-center space-x-2 hover:text-green-400">
              <TreePine />
              {isOpen && <span>Adopted Trees</span>}
            </Link>
          </li>
          <li>
            <Link to="/Request" className="flex items-center space-x-2 hover:text-green-400">
              <List />
              {isOpen && <span>Requests</span>}
            </Link>
          </li>
          <li>
            <Link to="/InviteOthers" className="flex items-center space-x-2 hover:text-green-400">
              <Mail />
              {isOpen && <span>Invite Others</span>}
            </Link>
          </li>
          <li>
            <Link to="/Eventlist" className="flex items-center space-x-2 hover:text-green-400">
              <BsCalendar2Event />
              {isOpen && <span>Events</span>}
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-red-400 w-full">
              <LogOut />
              {isOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;