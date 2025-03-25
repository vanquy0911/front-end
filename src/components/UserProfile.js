import React, { useState, useEffect } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Lấy thông tin người dùng từ backend (API)
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: user.name,
          phone: user.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response); // Ghi log response để kiểm tra
      alert("Profile updated successfully"); // Bạn có thể hiển thị thông báo thành công ở đây
    } catch (error) {
      console.error("Error updating profile", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "http://localhost:5000/api/users/change-password",
        { password, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response); // Ghi log response để kiểm tra
      alert("Password changed successfully"); // Bạn có thể hiển thị thông báo thành công ở đây
    } catch (error) {
      console.error("Error changing password", error);
      setError("Incorrect current password or error changing password.");
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={user.email} disabled />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      <h3>Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <div>
          <label>Current Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default UserProfile;
