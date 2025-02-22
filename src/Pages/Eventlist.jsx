import { useEffect, useState } from "react";
import axios from "axios";
import ProfileSidebar from "../Components/ProfileSidebar";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [success, setSuccess] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://treeplantadopt-springboot-production.up.railway.app/events/all"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleJoinEvent = async (eventId) => {
    try {
      await axios.post(
        `https://treeplantadopt-springboot-production.up.railway.app/events/${eventId}/join/${user.id}`
      );
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, isJoined: true } : event
        )
      );
      setSuccess("Event joined successfully!");
    } catch (error) {
      console.error("Error joining event:", error);
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      await axios.post(
        `https://treeplantadopt-springboot-production.up.railway.app/events/${eventId}/leave/${userId}`
      );
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId ? { ...event, isJoined: false } : event
        )
      );
      setSuccess("Event left successfully!");
    } catch (error) {
      console.error("Error leaving event:", error);
    }
  };

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 p-6 min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">Available Events</h2>
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="border p-2">Event Name</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border text-center">
                  <td className="border p-2">{event.place}</td>
                  <td className="border p-2">{event.date}</td>
                  <td className="border p-2">{event.time}</td>
                  <td className="border p-2">{event.description}</td>
                  <td className="border p-2">
                    {event.isJoined ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleLeaveEvent(event.id)}
                      >
                        Leave Event
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => handleJoinEvent(event.id)}
                      >
                        Join Event
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventList;