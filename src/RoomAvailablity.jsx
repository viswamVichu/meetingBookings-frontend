import React, { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const RoomAvailability = () => {
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
      setSlots(res.data);
    } catch {
      setSlots([]);
      alert("Error fetching availability");
    }
    setLoading(false);
  };

  const isRoomFree = slots.length === 0;

  return (
    <section className="pt-[120px] px-4 sm:px-8 min-h-screen bg-[#114232] font-poppins">
      <div className="bg-white p-6 rounded shadow text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Room Availability
        </h2>

        {/* Form */}
        <form
          onSubmit={checkAvailability}
          className="flex flex-wrap gap-4 justify-center mb-6"
        >
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded min-w-[150px]"
          >
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
            className="px-4 py-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
          >
            {loading ? "Checking..." : "Check"}
          </button>
        </form>

        {/* Result */}
        {!loading && room && date && (
          <div>
            {isRoomFree ? (
              <div className="text-center text-green-700 font-semibold bg-green-50 border border-green-300 rounded p-4">
                ✅ Room <span className="underline">{room}</span> is fully
                available on {date}
              </div>
            ) : (
              <div>
                <div className="text-center text-red-700 font-semibold bg-red-50 border border-red-300 rounded p-4 mb-4">
                  ❌ Room <span className="underline">{room}</span> is booked
                  during the following times on {date}
                </div>

                {/* Table View */}
                <table className="w-full table-auto border-collapse text-sm bg-white rounded shadow">
                  <thead>
                    <tr className="bg-[#FFDE21] text-black">
                      <th className="border px-4 py-2">Start Time</th>
                      <th className="border px-4 py-2">End Time</th>
                      <th className="border px-4 py-2">Booking Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((slot, idx) => (
                      <tr
                        key={idx}
                        className="bg-gray-50 hover:bg-gray-100 transition"
                      >
                        <td className="border px-4 py-2">
                          {new Date(slot.StartTime).toLocaleTimeString()}
                        </td>
                        <td className="border px-4 py-2">
                          {new Date(slot.EndTime).toLocaleTimeString()}
                        </td>
                        <td className="border px-4 py-2">
                          {slot.BookingName || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomAvailability;
