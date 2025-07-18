import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import MeetingBooking from "./MeetingBooking";
import BookingList from "./BookingList";
import CalendarList from "./CalendarList";
import UserAccess from "./UserAccess";
import ApproverPanel from "./approverPanel";
import RoomAvailablity from "./RoomAvailablity"; // <-- import your new component

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/meeting-booking" element={<MeetingBooking />} />
        <Route path="/booking-list" element={<BookingList />} />
        <Route path="/calendar-list" element={<CalendarList />} />
        <Route path="/user-access" element={<UserAccess role="admin" />} />
        <Route path="/user-access-user" element={<UserAccess role="user" />} />
        <Route
          path="/user-access-approver"
          element={<UserAccess role="approver" />}
        />
        <Route path="/approver-panel" element={<ApproverPanel />} />
        <Route path="/room-availablity" element={<RoomAvailablity />} />{" "}
        {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
