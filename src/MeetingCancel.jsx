import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MeetingCancel = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bookings?status=approved`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  useEffect(() => {
    const match = bookings.find((b) => b._id === selectedBookingId);
    setSelectedBooking(match || null);
  }, [selectedBookingId, bookings]);

  const handleCancel = async () => {
    try {
      await axios.patch(`${API_URL}/api/bookings/${selectedBookingId}`, {
        status: "cancelled",
      });
      alert("Meeting cancelled successfully!");
      setSelectedBookingId("");
      setSelectedBooking(null);
      // Refresh booking list
      const res = await axios.get(`${API_URL}/api/bookings?status=approved`);
      setBookings(res.data);
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel booking!");
    }
  };

  return (
    <div className="min-h-screen bg-[#114232] mt-[100px] px-6 py-10 text-white font-poppins">
      <h2 className="text-xl font-bold mb-4">Cancel a Meeting</h2>

      <select
        value={selectedBookingId}
        onChange={(e) => setSelectedBookingId(e.target.value)}
        className="text-black px-4 py-2 rounded bg-white mb-6"
      >
        <option value="">-- Select Booking --</option>
        {bookings.map((b) => (
          <option key={b._id} value={b._id}>
            {b.BookingName} ({b.MeetingRoom})
          </option>
        ))}
      </select>

      {selectedBooking && (
        <div className="bg-white text-black rounded-lg p-4 max-w-md shadow-md">
          <p>
            <strong>Booking Name:</strong> {selectedBooking.BookingName}
          </p>
          <p>
            <strong>Project Name:</strong> {selectedBooking.ProjectName}
          </p>
          <p>
            <strong>Programme Title:</strong> {selectedBooking.ProgramTitle}
          </p>
          <p>
            <strong>Meeting Room:</strong> {selectedBooking.MeetingRoom}
          </p>
          <button
            onClick={handleCancel}
            className="mt-4 px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingCancel;
