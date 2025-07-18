import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const MeetingBooking = () => {
  const [formData, setFormData] = useState({
    BookingName: "",
    ProjectName: "",
    ProgramTitle: "",
    Participants: "",
    EventInCharge: "",
    InChargeEmail: "",
    ApproverEmail: "",
    MeetingRoom: "",
    StartTime: "",
    EndTime: "",
    AudioVisual: "",
    VideoConf: "",
    Catering: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["AudioVisual", "VideoConf", "Catering"].includes(name)) {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    // Prepare payload with correct field names and types
    const payload = {
      BookingName: formData.BookingName,
      ProjectName: formData.ProjectName,
      ProgramTitle: formData.ProgramTitle, // Correct field name
      Participants: Number(formData.Participants),
      EventInCharge: formData.EventInCharge,
      InChargeEmail: formData.InChargeEmail,
      ApproverEmail: formData.ApproverEmail,
      StartTime: new Date(formData.StartTime).toISOString(),
      EndTime: new Date(formData.EndTime).toISOString(),
      AudioVisual: formData.AudioVisual,
      VideoConf: formData.VideoConf,
      Catering: formData.Catering,
      MeetingRoom: formData.MeetingRoom,
    };

    try {
      await axios.post(`${API_URL}/api/bookings`, payload);

      alert("Booking created successfully!");
    } catch (err) {
      console.error("Booking error:", err);
      if (err.response?.status === 409) {
        alert("This time slot is already booked.");
      } else {
        alert("Something went wrong!");
      }
    }
    setLoading(false);
  };

  return (
    <section className="mt-[100px] px-10 h-screen w-full bg-[green]">
      <div className="2xl:container mx-auto max-w-3xl p-8 rounded text-[14px]">
        <form className="grid grid-cols-1 gap-4 py-10" onSubmit={handleSubmit}>
          {/* Text and number fields */}
          {[
            { label: "Booking Name", name: "BookingName", type: "text" },
            { label: "Project Name", name: "ProjectName", type: "text" },
            {
              label: "No of Participants",
              name: "Participants",
              type: "number",
            },
            { label: "Event In Charge", name: "EventInCharge", type: "text" },
            { label: "In Charge Email", name: "InChargeEmail", type: "email" },
            { label: "Approver Email", name: "ApproverEmail", type: "email" },
            { label: "Start Time", name: "StartTime", type: "datetime-local" },
            { label: "End Time", name: "EndTime", type: "datetime-local" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex items-center gap-4">
              <label className="w-48 text-white font-medium">{label}:</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                className="w-[50%] py-2 px-4 border border-gray-300 rounded"
                required
              />
            </div>
          ))}

          {/* Boolean fields as dropdowns */}
          <div className="flex items-center gap-4">
            <label className="w-48 text-white font-medium">
              Audio Visual Needed:
            </label>
            <select
              name="AudioVisual"
              value={formData.AudioVisual}
              onChange={handleChange}
              className="w-[50%] py-2 px-4 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select --</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-48 text-white font-medium">
              Video Conference Needed:
            </label>
            <select
              name="VideoConf"
              value={formData.VideoConf}
              onChange={handleChange}
              className="w-[50%] py-2 px-4 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select --</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="w-48 text-white font-medium">
              Catering Required:
            </label>
            <select
              name="Catering"
              value={formData.Catering}
              onChange={handleChange}
              className="w-[50%] py-2 px-4 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select --</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Meeting Room */}
          <div className="flex items-center gap-4">
            <label className="w-48 text-white font-medium">Meeting Room:</label>
            <select
              name="MeetingRoom"
              value={formData.MeetingRoom}
              onChange={handleChange}
              className="w-[50%] py-2 px-4 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select Room --</option>
              <option value="IGNOU">IGNOU</option>
              <option value="COMMITTEE">COMMITTEE</option>
              <option value="AUDITORIUM">AUDITORIUM</option>
            </select>
          </div>

          {/* Programme Title */}
          <div className="flex items-center gap-4">
            <label className="w-48 text-white font-medium">
              Programme Title:
            </label>
            <select
              name="ProgramTitle"
              value={formData.ProgramTitle}
              onChange={handleChange}
              className="w-[50%] py-2 px-4 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select Programme Title --</option>
              <option value="Information Technology">
                Information Technology
              </option>
              <option value="Administration">Administration</option>
              <option value="Accounts">Accounts</option>
              <option value="Coastal System Research">
                Coastal System Research
              </option>
              <option value="ANH">ANH</option>
              <option value="Biodiversity">Biodiversity</option>
              <option value="BioTechnology">BioTechnology</option>
              <option value="Eco Technology">Eco Technology</option>
              <option value="Climate Control">Climate Control</option>
              <option value="HMRC">HMRC</option>
            </select>
          </div>

          <div className="ml-[35%] gap-4 py-3">
            <button
              className="bg-[#FFDE21] text-black font-bold py-3 px-2 rounded-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Booking..." : "Booking a meeting room"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MeetingBooking;
