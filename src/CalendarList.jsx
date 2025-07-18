import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);
const API_URL = import.meta.env.VITE_API_URL;

const ROOMS = ["IGNOU", "COMMITTEE", "AUDITORIUM"];

// Custom toolbar to hide navigation and agenda/today buttons
const CustomToolbar = () => <div style={{ height: 0 }} />;

const CalendarList = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);
  const [events, setEvents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("ALL");
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get(`${API_URL}/api/bookings?status=approved`).then((res) => {
      const bookings = res.data.map((b) => {
        const start = new Date(b.StartTime);
        const end = new Date(b.EndTime);
        const formatTime = (date) =>
          date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return {
          ...b,
          title: `${b.BookingName || "-"} (${b.MeetingRoom}) | ${formatTime(
            start
          )} - ${formatTime(end)}`,
          start,
          end,
          allDay: false,
        };
      });
      setEvents(bookings);
    });
  }, []);

  // Filter events by selected room and search
  const filteredEvents = events.filter((e) => {
    const roomMatch =
      selectedRoom === "ALL" ? true : e.MeetingRoom === selectedRoom;
    const searchMatch = search
      ? e.MeetingRoom.toLowerCase().includes(search.toLowerCase())
      : true;
    return roomMatch && searchMatch;
  });

  // Check if selected room is free (no bookings)
  const isRoomFree =
    selectedRoom !== "ALL" &&
    filteredEvents.filter((e) => e.MeetingRoom === selectedRoom).length === 0;

  return (
    <div
      className=""
      style={{
        minHeight: "calc(100vh - 80px)",
        margin: "0 auto",
        marginTop: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ marginBottom: 20, display: "flex", gap: 16 }}>
        <label style={{ fontWeight: "bold" }}>Meeting Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          style={{ padding: "8px 16px", borderRadius: 6 }}
        >
          <option value="ALL">All Rooms</option>
          {ROOMS.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        style={{ height: 600, width: "100%" }}
        views={["month"]}
        toolbar={true}
        components={{
          toolbar: CustomToolbar,
        }}
      />
      {selectedRoom !== "ALL" && isRoomFree && (
        <div
          style={{
            color: "green",
            textAlign: "center",
            marginTop: 20,
            fontWeight: "bold",
          }}
        >
          {selectedRoom} room is free/available!
        </div>
      )}
    </div>
  );
};

export default CalendarList;
