import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUsers, FiBarChart2, FiLogOut, FiMenu } from "react-icons/fi";
import { TiTree } from "react-icons/ti";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { BsCalendar2Event } from "react-icons/bs";
import { VscFeedback } from "react-icons/vsc";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin"); // Clear admin session
    navigate("/adminlogin"); // Redirect to Admin Login
  };

  return (
    <div
      className={`h-screen bg-gray-800  text-white p-4 ${
        isOpen ? "w-64" : "w-16"
      } transition-all`}
    >
      <button onClick={() => setIsOpen(!isOpen)} className="mb-6 text-xl">
        <FiMenu />
      </button>

      <ul className="space-y-4">
        <li>
          <Link
            to="/admindashboard"
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <FiBarChart2 />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/Adminusers"
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <FiUsers />
            {isOpen && <span>User Management</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/Treemanagement"
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <TiTree />
            {isOpen && <span>Tree Management</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/Adminemails"
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <MdOutlineMailOutline />
            {isOpen && <span>Email Management</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/AdminWhatsapp"
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <FaWhatsapp />
            {isOpen && <span>WhatsApp Messages</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/Eventmanagement"
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <BsCalendar2Event />
            {isOpen && <span>Event Management</span>}
          </Link>
        </li>
        <li>
          <Link
            to="/Adminfeedback"
            className="flex items-center space-x-2 hover:text-green-400"
          >
            <VscFeedback />
            {isOpen && <span>Feedback</span>}
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 hover:text-red-400 w-full"
          >
            <FiLogOut />
            {isOpen && <span>Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
