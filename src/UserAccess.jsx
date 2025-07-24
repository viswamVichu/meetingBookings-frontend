import React from "react";

const UserAccess = ({ role }) => {
  let content;
  switch (role) {
    case "admin":
      content = (
        <>
          <h2>Admin Panel</h2>
          <p>Welcome, Admin! You have full access.</p>
        </>
      );
      break;
    case "user":
      content = (
        <>
          <h2>User Panel</h2>
          <p>Welcome, User! You can book and view meetings.</p>
        </>
      );
      break;
    case "approver":
      content = (
        <>
          <h2>Approver Panel</h2>
          <p>Welcome, Approver! You can approve or reject bookings.</p>
        </>
      );
      break;
    default:
      content = (
        <>
          <h2>User Access</h2>
          <p>No role specified.</p>
        </>
      );
  }

  return (
    <div
      className="bg-[#114232] h-screen w-full "
      style={{ marginTop: "120px", color: "white", textAlign: "center" }}
    >
      {content}
    </div>
  );
};

export default UserAccess;
