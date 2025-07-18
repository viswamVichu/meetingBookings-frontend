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
    <div style={{ marginTop: "120px", color: "black", textAlign: "center" }}>
      <h2>Approver Panel</h2>
      {bookings.length === 0 ? (
        <p>No pending bookings.</p>
      ) : (
        <ul>
          {bookings.map((b) => (
            <li
              key={b.id || b._id}
              style={{
                margin: "20px 0",
                border: "1px solid #ccc",
                padding: 10,
              }}
            >
              <div>
                <b>{b.BookingName}</b> ({b.MeetingRoom})<br />
                Status: {b.Status}
              </div>
              <button
                disabled={loading}
                onClick={() => handleApprove(b.id || b._id)}
                style={{ marginRight: 10 }}
              >
                Approve
              </button>
              <button
                disabled={loading}
                onClick={() => handleReject(b.id || b._id)}
              >
                Reject
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApproverPanel;
