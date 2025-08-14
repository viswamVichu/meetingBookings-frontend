import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";

const localizer = momentLocalizer(moment);
const API_URL = import.meta.env.VITE_API_URL;
const ROOMS = ["IGNOU", "COMMITTEE", "AUDITORIUM"];
const CustomToolbar = () => <div style={{ height: 0 }} />;

const CalendarList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("ALL");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");

  // 🔐 Check login status
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // 🆕 Refetch approved bookings on initial load or if refresh flag is set
  useEffect(() => {
    const shouldRefresh = localStorage.getItem("refreshCalendar") === "true";

    if (shouldRefresh || events.length === 0) {
      axios.get(`${API_URL}/api/bookings?status=approved`).then((res) => {
        const bookings = res.data.map((b) => {
          const start = new Date(b.StartTime);
          const end = new Date(b.EndTime);
          const formatTime = (date) =>
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
          return {
            ...b,
            title: `${b.BookingName || "-"} — ${b.ProjectName || "-"} (${
              b.ProgramTitle || "-"
            }) | ${b.MeetingRoom || "-"} | ${formatTime(start)} - ${formatTime(
              end
            )}`,
            start,
            end,
            allDay: false,
          };
        });

        // 🧹 Reset refresh flag
        localStorage.removeItem("refreshCalendar");
        setEvents(bookings);
      });
    }
  }, []);

  // 🔎 Filter based on room + search
  const filteredEvents = events.filter((e) => {
    const roomMatch = selectedRoom === "ALL" || e.MeetingRoom === selectedRoom;
    const searchMatch = search
      ? e.MeetingRoom.toLowerCase().includes(search.toLowerCase())
      : true;
    return roomMatch && searchMatch;
  });

  // ✅ Check if selected room has no events
  const isRoomFree =
    selectedRoom !== "ALL" &&
    filteredEvents.filter((e) => e.MeetingRoom === selectedRoom).length === 0;

  return (
    <div className="min-h-screen w-full bg-[#114232] mt-[100px] flex text-sm flex-col items-center justify-start py-10 px-6 text-white font-poppins">
      {/* Room selector */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
        <label className="font-semibold">Meeting Room:</label>
        <select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          className="py-2 px-4 rounded bg-white text-black"
        >
          <option value="ALL">All Rooms</option>
          {ROOMS.map((room) => (
            <option key={room} value={room}>
              {room}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <div className="w-full max-w-6xl">
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          titleAccessor={(event) => event.BookingName}
          style={{ height: 600, width: "100%" }}
          views={["month"]}
          onSelectEvent={(event) => setSelectedEvent(event)}
          components={{ toolbar: CustomToolbar }}
        />
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full max-w-md">
            <h3 className="font-bold text-lg mb-4 text-center">
              Booking Details
            </h3>
            <p>
              <strong>Booking Name:</strong> {selectedEvent.BookingName}
            </p>
            <p>
              <strong>Project Name:</strong> {selectedEvent.ProjectName}
            </p>
            <p>
              <strong>Programme Title:</strong> {selectedEvent.ProgramTitle}
            </p>
            <p>
              <strong>Meeting Room:</strong> {selectedEvent.MeetingRoom}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedEvent.start).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(selectedEvent.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              –{" "}
              {new Date(selectedEvent.end).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2 bg-[#FFDE21] rounded text-black font-semibold hover:bg-yellow-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Availability Info */}
      {selectedRoom !== "ALL" && isRoomFree && (
        <div className="text-green-400 text-center mt-6 font-bold">
          {selectedRoom} room is free/available!
        </div>
      )}
    </div>
  );
};

export default CalendarList;
