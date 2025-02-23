import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    rating: "",
    improvements: "",
    issuesFaced: "",
    additionalComments: "",
    recommend: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Check if user is logged in

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      treeOwner: {
        id: user.id,
      },
      rating: formData.rating,
      improvements: formData.improvements,
      issues: formData.issuesFaced,
      additionalComments: formData.additionalComments,
      recommendation: formData.recommend === "yes",
    };
    console.log("Feedback data:", feedbackData);
    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/treeowner/feedback",
        feedbackData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("Feedback submitted:", response.data);
      alert("Thank you for your feedback!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          You must be logged in to submit feedback.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">Overall Experience (Rating 1-5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.rating}
            onChange={handleChange}
            required
          />

          <textarea
            name="improvements"
            placeholder="What improvements would you suggest?"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.improvements}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="issuesFaced"
            placeholder="Did you face any issues?"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.issuesFaced}
            onChange={handleChange}
          ></textarea>

          <textarea
            name="additionalComments"
            placeholder="Any additional comments?"
            className="w-full px-3 py-2 border rounded mb-3"
            value={formData.additionalComments}
            onChange={handleChange}
          ></textarea>

          <label className="block mb-2">
            Would you recommend this platform?
          </label>
          <div className="flex gap-4 mb-4">
            <label>
              <input
                type="radio"
                name="recommend"
                value="yes"
                onChange={handleChange}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="recommend"
                value="no"
                onChange={handleChange}
                required
              />
              No
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
