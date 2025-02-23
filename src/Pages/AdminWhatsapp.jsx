import { useState } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";

const WhatsAppMessages = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendMessage = async () => {
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/admin/send-whatsapp",
        { message }
      );

      if (response.status === 200) {
        setSuccess("Message sent successfully to all tree owners!");
        setMessage("");
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (err) {
      setError("Error sending message. Check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen mt-15">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-100 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Send WhatsApp Message</h1>
        <textarea
          className="w-full max-w-lg p-3 border border-gray-300 rounded-lg"
          rows="5"
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          onClick={handleSendMessage}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>}
      </div>
    </div>
  );
};

export default WhatsAppMessages;
