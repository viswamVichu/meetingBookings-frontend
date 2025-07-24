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

    const payload = {
      BookingName: formData.BookingName,
      ProjectName: formData.ProjectName,
      ProgramTitle: formData.ProgramTitle,
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

    console.log("Submitting to:", `${API_URL}/api/bookings`);
    console.log("Payload:", payload);

    try {
      const res = await axios.post(`${API_URL}/api/bookings`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 201 || res.status === 200) {
        alert("Booking created successfully!");
      } else {
        alert("Unexpected response from server.");
      }
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
    <>
      <section className="min-h-screen w-full bg-[#114232] flex items-center justify-center px-4 sm:px-10 py-10 mt-[50px] font-poppins ">
        <div className="2xl:container mx-auto max-w-3xl p-8 rounded text-[14px]">
          <form
            className="grid grid-cols-1 gap-4 py-10 ml-[200px] text-sm"
            onSubmit={handleSubmit}
          >
            {/* Text and number fields */}
            {[
              { label: "Booking Name", name: "BookingName", type: "text" },
              { label: "Project Name", name: "ProjectName", type: "text" },

              // ✅ Program Title moved to 3rd
              {
                label: "Programme Title",
                name: "ProgramTitle",
                type: "select",
                options: [
                  "Information Technology",
                  "Administration",
                  "Accounts",
                  "Coastal System Research",
                  "ANH",
                  "Biodiversity",
                  "BioTechnology",
                  "Eco Technology",
                  "Climate Control",
                  "HMRC",
                ],
              },

              // ✅ Meeting Room moved to 4th
              {
                label: "Meeting Room",
                name: "MeetingRoom",
                type: "select",
                options: ["IGNOU", "COMMITTEE", "AUDITORIUM"],
              },

              {
                label: "No of Participants",
                name: "Participants",
                type: "number",
              },
              { label: "Event In Charge", name: "EventInCharge", type: "text" },
              {
                label: "In Charge Email",
                name: "InChargeEmail",
                type: "email",
              },
              { label: "Approver Email", name: "ApproverEmail", type: "email" },
              {
                label: "Start Time",
                name: "StartTime",
                type: "datetime-local",
              },
              { label: "End Time", name: "EndTime", type: "datetime-local" },
            ].map(({ label, name, type, options }) => (
              <div key={name} className="flex items-center gap-4">
                <label className="w-48 text-white font-medium">{label}:</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-[50%] py-2 px-4 border border-gray-300 rounded"
                    required
                  >
                    <option value="">-- Select --</option>
                    {options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={label}
                    className="w-[50%] py-2 px-4 border border-gray-300 rounded"
                    required
                  />
                )}
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
    </>
  );
};

export default MeetingBooking;
