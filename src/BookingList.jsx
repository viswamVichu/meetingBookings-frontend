import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const ROOMS = ["IGNOU", "COMMITTEE", "AUDITORIUM"];

const BookingList = () => {
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState("ALL");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Fetch bookings on mount
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      console.warn("No userEmail found in localStorage!");
      setLoading(false);
      return;
    }

    axios
      .get(`${API_URL}/api/bookings?email=${userEmail}`)
      .then((res) => {
        const filtered = res.data.filter(
          (b) =>
            b.Status?.toLowerCase() !== "cancelled" &&
            b.Status?.toLowerCase() !== "pending-cancel"
        );
        setBookings(filtered);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ Handle cancel request
  const handleCancelRequest = async (booking) => {
    const { id, BookingName } = booking;

    try {
      await axios.patch(`${API_URL}/api/bookings/${id}`, {
        Status: "cancelled",
      });

      alert(`Booking '${BookingName}' cancelled successfully!`);

      setBookings((prev) =>
        prev.filter((b) => b.id !== id && b.Status !== "cancelled")
      );
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel booking.");
    }
  };

  // ✅ Filter bookings by selected room
  const filteredBookings =
    selectedRoom === "ALL"
      ? bookings
      : bookings.filter((b) => b.MeetingRoom === selectedRoom);

  return (
    <section className="min-h-screen w-full bg-[#114232] pt-[120px] px-4 sm:px-8 font-poppins">
      <div className="w-full bg-white p-6 rounded shadow-md text-[1.7rem]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          My Booking List
        </h2>

        {/* ✅ Room Selector */}
        <div className="flex items-center gap-4 mb-6">
          <label className="w-48 text-gray-700 font-medium">
            Meeting Room:
          </label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="flex-1 py-2 px-4 border border-gray-300 rounded"
          >
            <option value="ALL">All Rooms</option>
            {ROOMS.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Booking Table or Fallback */}
        {loading ? (
          <p className="text-center text-gray-600">Loading bookings...</p>
        ) : filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-[#FFDE21] text-black text-[1rem]">
                  <th className="border px-4 py-2">Booking Name</th>
                  <th className="border px-4 py-2">Room</th>
                  <th className="border px-4 py-2">Project</th>
                  <th className="border px-4 py-2">Programme</th>
                  <th className="border px-4 py-2">Participants</th>
                  <th className="border px-4 py-2">In Charge</th>
                  <th className="border px-4 py-2">Start Time</th>
                  <th className="border px-4 py-2">End Time</th>
                  <th className="border px-4 py-2">AV</th>
                  <th className="border px-4 py-2">VC</th>
                  <th className="border px-4 py-2">Catering</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((b, index) => (
                  <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                    <td className="border px-4 py-2">{b.BookingName || "-"}</td>
                    <td className="border px-4 py-2">{b.MeetingRoom}</td>
                    <td className="border px-4 py-2">{b.ProjectName || "-"}</td>
                    <td className="border px-4 py-2">
                      {b.ProgramTitle || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.Participants || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.EventInCharge || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.StartTime
                        ? new Date(b.StartTime).toLocaleString()
                        : "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.EndTime ? new Date(b.EndTime).toLocaleString() : "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.AudioVisual ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.VideoConf ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2">
                      {b.Catering ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2">
                      <span
                        className={`font-semibold ${
                          b.Status?.toLowerCase() === "approved"
                            ? "text-green-600"
                            : b.Status?.toLowerCase() === "pending"
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      >
                        {b.Status || "Unknown"}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        onClick={() => handleCancelRequest(b)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">
            No bookings available yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default BookingList;
