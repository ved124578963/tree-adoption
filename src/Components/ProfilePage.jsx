import React, { useState } from "react";
import axios from "axios";

const ProfilePage = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const email = user.email;
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditPasswordClick = () => {
        setIsEditingPassword(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // const response = await axios.put(
            //     `http://localhost:8080/treeowner/update/${user.id}`,
            //     {
            //         user.firstName,
            //         lastName,
            //         email,
            //     }
            // );
            console.log("Profile updated:", response.data);
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
            // const response = await axios.put(
            //     `http://localhost:8080/treeowner/update-password`,
            //     {
            //         userId: user.firstName,
            //         oldPassword,
            //         newPassword,
            //     }
            // );
            // console.log("Password updated:", response.data);
            setIsEditingPassword(false);
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            <div className="bg-white text-green-600 p-4 rounded-lg shadow-md">
                <p>
                    <strong>First Name:</strong> {firstName}
                </p>
                <p>
                    <strong>Last Name:</strong> {lastName}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 mt-2"
                    onClick={handleEditClick}
                >
                    Edit Profile
                </button>
                <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 mt-2 ml-2"
                    onClick={handleEditPasswordClick}
                >
                    Edit Password
                </button>
            </div>

            {isEditing && (
                <form
                    onSubmit={handleFormSubmit}
                    className="mt-4 bg-white p-4 rounded-lg shadow-md"
                >
                    <div className="mb-4">
                        <label
                            className="block text-green-600 mb-2"
                            htmlFor="firstName"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-green-600 mb-2"
                            htmlFor="lastName"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Save Changes
                    </button>
                </form>
            )}

            {isEditingPassword && (
                <form
                    onSubmit={handlePasswordFormSubmit}
                    className="mt-4 bg-white p-4 rounded-lg shadow-md"
                >
                    <div className="mb-4">
                        <label
                            className="block text-green-600 mb-2"
                            htmlFor="oldPassword"
                        >
                            Old Password
                        </label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-green-600 mb-2"
                            htmlFor="newPassword"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-green-600 mb-2"
                            htmlFor="confirmNewPassword"
                        >
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Save Password
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
