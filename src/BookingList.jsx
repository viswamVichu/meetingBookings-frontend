import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const ROOMS = ["IGNOU", "COMMITTEE", "AUDITORIUM"];

const BookingList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);
  const [selectedRoom, setSelectedRoom] = useState("ALL");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/bookings`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  // Filter bookings by selected room
  const filteredBookings =
    selectedRoom === "ALL"
      ? bookings
      : bookings.filter((b) => b.MeetingRoom === selectedRoom);

  return (
    <section className="pt-[120px] px-6 min-h-screen bg-[green]">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Booking List
        </h2>

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

        {filteredBookings.length > 0 ? (
          <ul className="space-y-4">
            {filteredBookings.map((b, index) => (
              <li key={index} className="border p-4 rounded bg-gray-50">
                <p>
                  <strong>Booking Name:</strong> {b.BookingName || "-"}
                </p>
                <p>
                  <strong>Meeting Room:</strong> {b.MeetingRoom}
                </p>
                <p>
                  <strong>Project Name:</strong> {b.ProjectName || "-"}
                </p>
                <p>
                  <strong>Programme Title:</strong> {b.ProgramTitle || "-"}
                </p>
                <p>
                  <strong>Participants:</strong> {b.Participants || "-"}
                </p>
                <p>
                  <strong>Event In Charge:</strong> {b.EventInCharge || "-"}
                </p>
                <p>
                  <strong>In Charge Email:</strong> {b.InChargeEmail || "-"}
                </p>
                <p>
                  <strong>Approver Email:</strong> {b.ApproverEmail || "-"}
                </p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {b.StartTime ? new Date(b.StartTime).toLocaleString() : "-"}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {b.EndTime ? new Date(b.EndTime).toLocaleString() : "-"}
                </p>
                <p>
                  <strong>Audio Visual Needed:</strong> {b.AudioVisual || "No"}
                </p>
                <p>
                  <strong>Video Conference Needed:</strong>{" "}
                  {b.VideoConf || "No"}
                </p>
                <p>
                  <strong>Catering:</strong> {b.Catering || "No"}
                </p>
              </li>
            ))}
          </ul>
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
