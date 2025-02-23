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
    <div className="flex mt-15">
      <ProfileSidebar />
      <div className="flex-1 p-8 min-h-screen bg-green-100 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
          Available Events
        </h2>
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <table className="w-full border-collapse text-gray-700">
            <thead className="bg-green-700 text-white text-lg">
              <tr>
                <th className="p-4">Event Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Time</th>
                <th className="p-4">Description</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="bg-white hover:bg-gray-200">
                  <td className="p-4 text-center">{event.place}</td>
                  <td className="p-4 text-center">{event.date}</td>
                  <td className="p-4 text-center">{event.time}</td>
                  <td className="p-4 text-center">{event.description}</td>
                  <td className="p-4 text-center">
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
