import { useState, useEffect } from "react";
import axios from "axios";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          setError("User ID not found. Please log in.");
          return;
        }

        const response = await axios.get(`https://treeplantadopt-springboot-production.up.railway.app/requests/all`);
        const filteredRequests = response.data.filter(
          (request) => request.requester.id === user.id || request.donation.donor.id === user.id
        );
        setRequests(filteredRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Error fetching requests. Please try again.");
      }
    };

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    console.log("Approving request with ID:", requestId); // Log the requestId
    try {
      const response = await axios.put(`https://treeplantadopt-springboot-production.up.railway.app/requests/approve/${requestId}`);
      setMessage(response.data.message);

      // Update the request status in the state
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? { ...request, status: "COMPLETED" } : request
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);
      }
      setError("Error approving request. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-4">Adoption Requests</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {message && <p className="text-green-500 text-center">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold mb-2">Species: {request.donation.species}</h3>
            <p>Donor: {request.donation.donor.username}</p>
            <p>Requested Quantity: {request.requestedQuantity}</p>
            <p>Status: {request.status}</p>
            {request.status !== "COMPLETED" && (
              <button
                onClick={() => handleApprove(request.id)}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;