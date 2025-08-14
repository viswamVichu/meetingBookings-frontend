import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import Login from "./Login";
import Register from "./Register";
import MeetingCancel from "./MeetingCancel";

// ✅ Role utility
const getRole = () => localStorage.getItem("role");

function AppRoutes() {
  const location = useLocation();
  const hideNavOnPaths = ["/login", "/register"];
  const shouldHideNav = hideNavOnPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Navigation />}
      <Routes>
        {/* 🔁 Default route redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 🔓 Public routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Only Approvers can access Home + Meeting Booking */}
        <Route
          path="/home"
          element={
            ["approver", "user"].includes(getRole()) ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/meeting-booking"
          element={
            ["approver", "user"].includes(getRole()) ? (
              <MeetingBooking />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* 🧾 Shared/role-based pages */}
        <Route path="/booking-list" element={<BookingList />} />
        <Route path="/calendar-list" element={<CalendarList />} />
        <Route path="/room-availablity" element={<RoomAvailablity />} />
        <Route path="/approver-panel" element={<ApproverPanel />} />
        <Route path="/user-access" element={<UserAccess role="admin" />} />
        <Route path="/user-access-user" element={<UserAccess role="user" />} />
        <Route path="/cancelled-bookings" element={<MeetingCancel />} />

        <Route
          path="/user-access-approver"
          element={<UserAccess role="approver" />}
        />
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
