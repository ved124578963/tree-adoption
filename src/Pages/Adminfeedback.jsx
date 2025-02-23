import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";

const Adminfeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          "https://treeplantadopt-springboot-production.up.railway.app/admin/getfeedbacks",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setError("Error fetching feedbacks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="flex flex-col mt-15 md:flex-row">
      <AdminSidebar />
      <div className="flex-1 p-6 min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-center">User Feedbacks</h1>
        {loading ? (
          <p className="text-center">Loading feedbacks...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-center text-gray-600">No feedbacks available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="border p-2">id</th>
                  <th className="border p-2">Rating</th>
                  <th className="border p-2">Improvements</th>
                  <th className="border p-2">Issues Faced</th>
                  <th className="border p-2">Additional Comments</th>
                  <th className="border p-2">Recommend</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((feedback, index) => (
                  <tr key={index} className="border text-center">
                    <td className="border p-2">{feedback.treeOwner.id}</td>
                    <td className="border p-2">{feedback.rating}</td>
                    <td className="border p-2">{feedback.improvements}</td>
                    <td className="border p-2">{feedback.issues}</td>
                    <td className="border p-2">
                      {feedback.additionalComments}
                    </td>
                    <td className="border p-2">
                      {feedback.recommendation ? "Yes" : "No"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adminfeedback;
