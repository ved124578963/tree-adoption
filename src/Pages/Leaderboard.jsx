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
    <div className="p-8 min-h-screen mt-15 bg-green-100 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8">
        Leaderboard
      </h1>

      <div className="overflow-x-auto w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse text-gray-700">
          <thead className="bg-green-700 text-white text-lg">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Username</th>
              <th className="p-4">Full Name</th>
              <th className="p-4">Trees Adopted</th>
              <th className="p-4">Rewards</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.totalTrees - a.totalTrees) // Sort by trees adopted (highest first)
              .map((user, index) => (
                <tr
                  key={user.username}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 hover:bg-gray-200"
                      : "bg-white hover:bg-gray-200"
                  }
                >
                  <td className="p-4 font-semibold text-center">{index + 1}</td>
                  <td className="p-4 text-center">{user.username}</td>
                  <td className="p-4 text-center">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="p-4 font-semibold text-center">
                    {user.totalTrees}
                  </td>
                  <td className="p-4 text-center">{user.totalRewards}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
