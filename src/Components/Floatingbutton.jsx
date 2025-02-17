import { useNavigate } from "react-router-dom";

const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => navigate("/Feedback")}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        📝 Feedback
      </button>
    </div>
  );
};

export default FloatingButton;