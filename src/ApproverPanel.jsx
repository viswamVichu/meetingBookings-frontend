import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const ApproverPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPending = () => {
    axios
      .get(`${API_URL}/api/bookings/pending`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    setLoading(true);
    await axios.post(`${API_URL}/api/bookings/${id}/approve`);

    // 🔥 Trigger refresh flag
    localStorage.setItem("refreshCalendar", "true");

    fetchPending();
    setLoading(false);
    alert("Booking approved and mail sent!");
  };

  const handleReject = async (id) => {
    setLoading(true);
    await axios.post(`${API_URL}/api/bookings/${id}/reject`);
    fetchPending();
    setLoading(false);
    alert("Booking rejected.");
  };

  return (
    <section className="pt-[120px] px-4 sm:px-8 min-h-screen bg-[#114232] font-poppins">
      <div className="bg-white rounded shadow p-6 text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Approver Panel</h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No pending bookings.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#FFDE21] text-black text-[1rem]">
                  <th className="border px-4 py-2">Booking Name</th>
                  <th className="border px-4 py-2">Room</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <td className="border px-4 py-2">{b.BookingName}</td>
                    <td className="border px-4 py-2">{b.MeetingRoom}</td>
                    <td className="border px-4 py-2">{b.Status}</td>
                    <td className="border px-4 py-2">
                      <button
                        disabled={loading}
                        onClick={() => handleApprove(b.id)}
                        className="px-3 py-1 mr-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => handleReject(b.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
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

export default ApproverPanel;
