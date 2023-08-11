import React, { useState, useEffect } from "react";
import axios from "axios";


const ManageUsers = ({ onSectionChange }) => {
  const [users, setUsers] = useState([]);
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    phone_number: "",
  });


  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users", { headers });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserStatus = async (userId, active) => {
    try {
      await axios.put(`/users/${userId}/activate_deactivate`, { active }, { headers });
      // After toggling, update the users list
      fetchUsers();
    } catch (error) {
      console.error("Error toggling user status:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/register", { ...newUserData, password: "jarvis94800", password_confirmation: "jarvis94800" }, { headers });
      // After creating the user, update the users list
      fetchUsers();
      // Clear the form fields
      setNewUserData({
        username: "",
        email: "",
        phone_number: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div className="ManageUser">
      <h1>Manage Users</h1>
      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUserData.username}
          onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserData.email}
          onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newUserData.phone_number}
          onChange={(e) => setNewUserData({ ...newUserData, phone_number: e.target.value })}
        />
        <button type="submit">Create User</button>
      </form>
      <ul className="manageuserList">
        {users.map((user) => (
          <li key={user.id} className="manageuserItem">
            <span className="manageusername">{user.username}</span>
            <span className={`managestatus ${user.active ? "manageactive" : "manageinactive"}`}>
              {user.active ? "Active" : "Inactive"}
            </span>
            <button
              className={`managetoggleButton ${user.active ? "managedeactivateButton" : "manageactivateButton"}`}
              onClick={() => toggleUserStatus(user.id, !user.active)}
            >
              {user.active ? "Deactivate" : "Activate"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
