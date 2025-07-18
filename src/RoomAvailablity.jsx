import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const RoomAvailablity = () => {
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkAvailability = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/bookings`, {
        params: { MeetingRoom: room, date },
      });
      setSlots(res.data); // Adjust if your backend returns differently
    } catch {
      setSlots([]);
      alert("Error fetching availability");
    }
    setLoading(false);
  };

  // Helper to check if the room is fully free
  const isRoomFree = slots.length === 0;

  return (
    <div className="p-8 min-h-[calc(100vh-80px)] bg-white flex flex-col items-center m-[100px]">
      <h2 className="text-xl font-bold mb-4">Room Availability</h2>
      <form
        onSubmit={checkAvailability}
        className="mb-4 flex gap-4 flex-wrap justify-center"
      >
        <select value={room} onChange={(e) => setRoom(e.target.value)} required>
          <option value="">Select Room</option>
          <option value="IGNOU">IGNOU</option>
          <option value="COMMITTEE">COMMITTEE</option>
          <option value="AUDITORIUM">AUDITORIUM</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </form>
      <div className="w-full max-w-md">
        {!loading &&
          room &&
          date &&
          (isRoomFree ? (
            <div className="text-green-700 font-semibold text-center border border-green-300 rounded p-4 bg-green-50">
              ✅ Room is fully available for {room} on {date}
            </div>
          ) : (
            <div>
              <div className="text-red-700 font-semibold text-center mb-2">
                ❌ Room is{" "}
                <span className="underline">not fully available</span> for{" "}
                {room} on {date}
              </div>
              <div className="text-gray-700 text-center mb-2">
                Booked slots:
              </div>
              <ul className="max-h-64 overflow-y-auto border rounded p-2 bg-gray-50">
                {slots.map((slot, idx) => (
                  <li key={idx} className="mb-1">
                    {slot.StartTime} - {slot.EndTime}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {loading && (
          <div className="text-center text-gray-500">
            Checking availability...
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomAvailablity;
