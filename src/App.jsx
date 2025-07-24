import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import MeetingBooking from "./MeetingBooking";
import BookingList from "./BookingList";
import CalendarList from "./CalendarList";

import UserAccess from "./UserAccess";
import ApproverPanel from "./ApproverPanel";
import RoomAvailablity from "./RoomAvailablity";
import Login from "./Login"; // 👈 Login page
import Register from "./Register"; // 👈 Register page

function AppRoutes() {
  const location = useLocation();
  const hideNavOnPaths = ["/login", "/register"];
  const shouldHideNav = hideNavOnPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Navigation />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
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
        <Route path="/room-availablity" element={<RoomAvailablity />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
