import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const MeetingCancel = () => {
  const [cancelled, setCancelled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bookings?status=cancelled`)
      .then((res) => setCancelled(res.data))
      .catch((err) => console.error("Cancelled fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen w-full bg-[#114232] pt-[120px] px-4 sm:px-8 font-poppins">
      <div className="w-full bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-700 flex items-center justify-center gap-2">
          <span>🗑️</span> Cancelled Bookings
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">
            Loading cancelled bookings...
          </p>
        ) : cancelled.length === 0 ? (
          <p className="text-center text-gray-500">
            No cancelled bookings found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-red-200 text-black text-[1rem]">
                  <th className="border px-4 py-2">Booking Name</th>
                  <th className="border px-4 py-2">Room</th>
                  <th className="border px-4 py-2">Project</th>
                  <th className="border px-4 py-2">Programme</th>
                  <th className="border px-4 py-2">Participants</th>
                  <th className="border px-4 py-2">In Charge</th>
                  <th className="border px-4 py-2">Start Time</th>
                  <th className="border px-4 py-2">End Time</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {cancelled.map((b, index) => (
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
                      <span className="text-gray-600 font-semibold">
                        {b.Status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MeetingCancel;
