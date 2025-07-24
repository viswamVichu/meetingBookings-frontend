import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const UserApproverPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingUsers = () => {
    axios
      .get(`${API_URL}/api/pending-users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (id) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/approve-user/${id}`);
      fetchPendingUsers();
      alert("User approved successfully!");
    } catch (err) {
      console.error("Error approving user:", err);
      alert("Approval failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-[120px] px-4 sm:px-8 min-h-screen bg-[#2C3E50] font-poppins">
      <div className="bg-white rounded shadow p-6 text-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">
          User Approval Panel
        </h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No pending users.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse text-sm">
              <thead>
                <tr className="bg-[#FFDE21] text-black text-[1rem]">
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Role</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <td className="border px-4 py-2">{u.email}</td>
                    <td className="border px-4 py-2 capitalize">{u.role}</td>
                    <td className="border px-4 py-2">{u.status}</td>
                    <td className="border px-4 py-2">
                      <button
                        disabled={loading}
                        onClick={() => handleApprove(u.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Approve
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserApproverPanel;
