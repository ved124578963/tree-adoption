import { useState } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";

const EmailManagement = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = async (emailType) => {
    const apiUrl = emailType === "plain" 
      ? "https://treeplantadopt-springboot-production.up.railway.app/admin/send-plainemails "
      : "https://treeplantadopt-springboot-production.up.railway.app/admin/send-htmlemails";

    try {
      await axios.post(apiUrl, {
        subject: formData.subject,
        message: formData.message,
      });
      alert(`Email sent successfully to all users as ${emailType} email!`);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Email Management</h2>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter email subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter email message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                type="button"
                onClick={() => handleSendEmail("plain")}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Send Plain Text Email
              </button>

              <button
                type="button"
                onClick={() => handleSendEmail("html")}
                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Send HTML Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailManagement;
