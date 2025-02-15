"use client";
import { useState } from "react";
import Sidebar from "../_components/Sidebar";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    profilePic: "https://i.pravatar.cc/50?img=1",
    petitionsSigned: 120,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    profilePic: "https://i.pravatar.cc/50?img=2",
    petitionsSigned: 5,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    profilePic: "https://i.pravatar.cc/50?img=3",
    petitionsSigned: 300, // Suspicious activity
  },
];

const Users = () => {
  const [userList, setUserList] = useState(users);

  // Delete a user from the list
  const deleteUser = (id: number) => {
    setUserList(userList.filter(user => user.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="mt-20 p-6 flex-1">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-gray-600">View and manage users on the platform</p>

        {/* User Table */}
        <div className="mt-6 bg-white shadow rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Profile</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Petitions Signed</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    {user.petitionsSigned}
                    {user.petitionsSigned > 250 && (
                      <span className="ml-2 text-red-500 font-bold">🚩 Spam Risk</span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button className="bg-[#223843]  text-white px-3 py-1 rounded">
                      View Profile
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
