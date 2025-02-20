import { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://treeplantadopt-springboot-production.up.railway.app/leaderboard/top"
      ) // Adjust the API URL as per your backend
      .then((response) => setUsers(response.data))
      .catch((error) =>
        console.error("Error fetching leaderboard data:", error)
      );
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">Leaderboard</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="border p-2">Rank</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Trees Adopted</th>
              <th className="border p-2">Rewards</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.totalTrees - a.totalTrees) // Sort by trees adopted (highest first)
              .map((user, index) => (
                <tr key={user.username} className="border text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{user.username}</td>
                  <td className="border p-2">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border p-2">{user.totalTrees}</td>
                  <td className="border p-2">{user.totalRewards}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;