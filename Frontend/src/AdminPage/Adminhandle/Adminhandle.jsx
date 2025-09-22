import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosSecure from "../../Hook/useAxoisSecure";

const AdminHandle = () => {
  const AxiosSecure = useAxiosSecure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmin] = useState([]);

  const fetchAdmins = async () => {
    const res = await AxiosSecure.get("/admin/find");
    setAdmin(res.data);
  };
  // Fetch admin list
  useEffect(() => {
    fetchAdmins();
  }, []);
  console.log(admins);
  // Add new admin
  const addAdmin = async (e) => {
    e.preventDefault();
    try {
      const result = await AxiosSecure.post("/admin/reg", { email, password });
      console.log(result.data);
      fetchAdmins(); // Refresh list
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error adding admin", error);
    }
  };

  // Delete an admin
  const deleteAdmin = async (id) => {
    try {
      await AxiosSecure.delete(`/admin/${id}`);
      fetchAdmins(); // Refresh list
    } catch (error) {
      console.error("Error deleting admin", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-5">Manage Admins</h2>

      {/* Add Admin Form */}
      <form onSubmit={addAdmin} className="mb-5">
        <div className="mb-3">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Add Admin
        </button>
      </form>

      {/* Admin List */}
      <h3 className="text-lg font-semibold mb-3">Admin List</h3>
      <ul>
        {admins.map((admin) => (
          <li
            key={admin._id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{admin.email}</span>
            <button
              onClick={() => deleteAdmin(admin._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminHandle;
