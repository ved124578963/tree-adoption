import { useState } from "react";
import axios from "axios";
import ProfileSidebar from "../Components/ProfileSidebar";

const InviteOthers = () => {
  const [formData, setFormData] = useState({
    invitedName: "",
    invitedEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/treeowner/invitemail",
        { ...formData, id: user.id }
      );

      if (response.status === 200) {
        setMessage("Invitation sent successfully!");
        setFormData({ invitedName: "", invitedEmail: "" });
      } else {
        setMessage("Failed to send invitation.");
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      setMessage("Error occurred while sending invitation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-6 min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Invite Others</h2>
          {message && <p className="text-center mb-4 text-green-600">{message}</p>}

          <form onSubmit={handleInvite} className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="invitedName"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter name"
                value={formData.invitedName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="invitedEmail"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email"
                value={formData.invitedEmail}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Invitation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteOthers;