import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.jpg";
import LogoutButton from "./LogoutButton";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  // Update isLoggedIn and role state when localStorage changes (login/logout)
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      setRole(localStorage.getItem("role") || "");
    };
    window.addEventListener("storage", checkLogin);
    const interval = setInterval(checkLogin, 500);
    return () => {
      window.removeEventListener("storage", checkLogin);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between p-4 bg-green-950 text-white fixed w-full top-0 z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-20 w-auto rounded-full" />
      </div>

      <div className="flex gap-4 items-center">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive
              ? "bg-black text-white p-2 rounded-md"
              : "bg-[#ccff00fd] p-2 text-black rounded-md"
          }
        >
          Login
        </NavLink>

        {/* Show Meeting Booking and Booking List only for user */}
        {isLoggedIn && role === "user" && (
          <>
            <NavLink
              to="/meeting-booking"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#CCFF00] p-2 text-black rounded-md"
              }
            >
              Meeting Booking
            </NavLink>
            <NavLink
              to="/booking-list"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#CCFF00] p-2 text-black rounded-md"
              }
            >
              Booking List
            </NavLink>
          </>
        )}

        {/* Show Approver Panel and Room Availability only for approver */}
        {isLoggedIn && role === "approver" && (
          <>
            <NavLink
              to="/approver-panel"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#CCFF00] p-2 text-black rounded-md"
              }
            >
              Approver Panel
            </NavLink>
            <NavLink
              to="/room-availablity"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#CCFF00] p-2 text-black rounded-md"
              }
            >
              Room Availability
            </NavLink>
          </>
        )}

        {/* Show Calendar List and User Access for all logged in users */}
        {isLoggedIn && (
          <>
            <NavLink
              to="/calendar-list"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#CCFF00] p-2 text-black rounded-md"
              }
            >
              Calendar List
            </NavLink>
            <NavLink
              to="/user-access"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#CCFF00] p-2 text-black rounded-md"
              }
            >
              User Access
            </NavLink>
          </>
        )}

        {isLoggedIn && <LogoutButton />}
      </div>
    </nav>
  );
};

export default Navigation;
