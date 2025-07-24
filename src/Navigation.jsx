import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./assets/logo.jpg";
import LogoutButton from "./LogoutButton";

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [showDropdown, setShowDropdown] = useState(false);

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
    <nav className="flex items-center justify-between bg-[#f7f7f7] p-4 text-white fixed w-full top-0 z-50 font-poppins text-lg">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-20 w-auto rounded-full" />
      </div>

      <div className="flex gap-4 items-center relative">
        {isLoggedIn && role === "user" && (
          <>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#578E7E] p-2 text-black rounded-md"
              }
            >
              Home
            </NavLink>

            {/* Click-based dropdown */}
            <div className="relative">
              <button
                className="bg-[#578E7E] p-2 text-black rounded-md"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                Meeting Hall Reservation
              </button>
              {showDropdown && (
                <div className="absolute bg-white text-black rounded shadow-md mt-2 min-w-[220px] z-10">
                  <NavLink
                    to="/meeting-booking"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Meeting Room
                  </NavLink>
                  <NavLink
                    to="/booking-list"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Booking List
                  </NavLink>
                  <NavLink
                    to="/calendar-list"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setShowDropdown(false)}
                  >
                    Calendar List
                  </NavLink>
                </div>
              )}
            </div>
          </>
        )}

        {/* Approver-only links */}
        {isLoggedIn && role === "approver" && (
          <>
            <NavLink
              to="/approver-panel"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#578E7E] p-2 text-black rounded-md"
              }
            >
              Approver Panel
            </NavLink>
            <NavLink
              to="/room-availablity"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white p-2 rounded-md"
                  : "bg-[#578E7E] p-2 text-black rounded-md"
              }
            >
              Room Availability
            </NavLink>
          </>
        )}

        {/* Common to all logged in users */}
        {isLoggedIn && (
          <NavLink
            to="/user-access"
            className={({ isActive }) =>
              isActive
                ? "bg-black text-white p-2 rounded-md"
                : "bg-[#578E7E] p-2 text-black rounded-md"
            }
          >
            User Access
          </NavLink>
        )}

        {isLoggedIn && <LogoutButton />}
      </div>
    </nav>
  );
};

export default Navigation;
