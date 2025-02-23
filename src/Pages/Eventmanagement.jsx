import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../Components/AdminSidebar";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    place: "",
    localDate: "",
    localTime: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://treeplantadopt-springboot-production.up.railway.app/events/all"
      );
      setEvents(response.data);
    } catch (error) {
      setError("No events available.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const formattedDate = e.target.value;
    setFormData({ ...formData, localDate: formattedDate });
  };

  const handleTimeChange = (e) => {
    const formattedTime = `${e.target.value}:00`;
    setFormData({ ...formData, localTime: formattedTime });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const eventData = {
      place: formData.place,
      date: formData.localDate,
      time: formData.localTime,
      description: formData.description,
    };

    try {
      const response = await axios.post(
        "https://treeplantadopt-springboot-production.up.railway.app/events/create",
        eventData
      );

      if (response.status === 200) {
        setSuccess("Event created successfully!");
        setFormData({
          place: "",
          localDate: "",
          localTime: "",
          description: "",
        });
        fetchEvents();
      } else {
        setError("Failed to create event.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Error occurred while creating the event.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(
        `https://treeplantadopt-springboot-production.up.railway.app/events/delete/${eventId}`
      );
      setSuccess("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      setError("Failed to delete event.");
    }
  };

  return (
    <div className="flex mt-15">
      <AdminSidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Event Management
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form onSubmit={handleCreateEvent}>
            <div className="mb-4">
              <label className="block text-gray-700">Place</label>
              <input
                type="text"
                name="place"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter event location"
                value={formData.place}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Date (YYYY-MM-DD)</label>
              <input
                type="date"
                name="localDate"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.localDate}
                onChange={handleDateChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Time (HH:MM:SS)</label>
              <input
                type="time"
                name="localTime"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.localTime.slice(0, 5)}
                onChange={handleTimeChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter event details"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Available Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-700">No events available.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => (
                <li key={event.id} className="mb-4">
                  <div className="p-4 border rounded-md h-55">
                    {" "}
                    {/* Fixed height for cards */}
                    <h3 className="text-lg font-semibold">{event.place}</h3>
                    <p className="text-gray-700">Date: {event.date}</p>
                    <p className="text-gray-700">Time: {event.time}</p>
                    <p className="text-gray-700">
                      Description: {event.description}
                    </p>
                    <p className="text-gray-700">
                      Participants: {event.participants.length}
                    </p>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="mt-2 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventManagement;
