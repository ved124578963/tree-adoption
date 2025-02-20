import React, { useState, useEffect } from "react";
import axios from "axios";
import Mytrees from "../Pages/Mytrees";
import Request from "../Pages/Request";
import ProfileSidebar from "./ProfileSidebar";

const user = JSON.parse(localStorage.getItem("user"));
const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser);
    if (storedUser) {
      setUser(storedUser);
      setFirstName(storedUser.firstName);
      setLastName(storedUser.lastName);
      setUsername(storedUser.username);
      setProfileImg(storedUser.profileImg);
      setLoading(false);
     }
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  const handleEditPasswordClick = () => {
    setIsEditingPassword((prev) => !prev);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/treeowner/update/${user.id}`,
        {
          firstName,
          lastName,
          email,
        }
      );
      console.log("Profile updated:");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:8080/treeowner/update-password`,
        {
          firstName,
          oldPassword,
          newPassword,
        }
      );
      console.log("Password updated:", response.data);
      setIsEditingPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  return (
    <div className="flex">
      <ProfileSidebar />
      <div className="flex-1 mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-green-700">Profile</h1>

        <div className="bg-white p-8 rounded-lg  text-center">
          <div className="flex flex-col items-center">
            <img
              src={`https://treeplantadopt-springboot-production.up.railway.app/files/treeowners/images/${profileImg}`}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border-4 border-green-500"
            />
            <p className="text-2xl font-semibold text-gray-800">
              {firstName} {lastName}
            </p>
            <p className="text-gray-500 text-sm">@{username}</p>

            <div className="flex justify-center gap-8 mt-6">
              <div className="bg-green-100 p-6 rounded-lg shadow-md w-40">
                <p className="text-lg font-bold text-green-600">Total Trees</p>
                <p className="text-3xl font-semibold text-green-800">{user.totalTrees}</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow-md w-40">
                <p className="text-lg font-bold text-green-600">Total Rewards</p>
                <p className="text-3xl font-semibold text-green-800">{user.totalRewards}</p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={handleEditClick}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={handleEditPasswordClick}
              >
                {isEditingPassword ? "Cancel" : "Edit Password"}
              </button>
            </div>
          </div>
        </div>

        {isEditing && (
          <form onSubmit={handleFormSubmit} className="mt-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-green-600 mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block text-green-600 mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </form>
        )}

        {isEditingPassword && (
          <form onSubmit={handlePasswordFormSubmit} className="mt-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-green-600 mb-2" htmlFor="oldPassword">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block text-green-600 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-6">
              <label className="block text-green-600 mb-2" htmlFor="confirmNewPassword">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Save Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;