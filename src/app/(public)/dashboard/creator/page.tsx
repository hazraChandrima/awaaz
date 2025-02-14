"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import React from "react";

const Dashboard = () => {
  const petitionStats = [
    { title: "Total Signatures", value: "7,892", change: "+12.5%" },
    { title: "Active Petitions", value: "3", change: "+1" },
    { title: "Success Rate", value: "85%", change: "+5.2%" },
    { title: "Avg. Daily Signatures", value: "156", change: "+8.2%" },
    { title: "Total Goals Combined", value: "8,000", change: "97.5%" },
    { title: "Most Successful", value: "Public Transport", change: "5,678" },
  ];

  const activePetitions = [
    { name: "Save Local Park", created: "2023-10-15", signed: 1234, goal: 2000 },
    { name: "Improve Public Transport", created: "2023-10-10", signed: 5678, goal: 5000 },
    { name: "Community Garden Initiative", created: "2023-10-05", signed: 890, goal: 1000 },
  ];

  const signatureGrowth = [
    { date: "Oct 1", signatures: 100 },
    { date: "Oct 5", signatures: 800 },
    { date: "Oct 10", signatures: 2200 },
    { date: "Oct 15", signatures: 3500 },
    { date: "Oct 20", signatures: 4500 },
    { date: "Oct 30", signatures: 5600 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Overview of your petition campaigns</p>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 justify-center">
      {petitionStats.map((stat, index) => (
      <div
      key={index}
      className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between text-center"
      >
      <h3 className="text-lg font-semibold">{stat.title}</h3>
      <p className="text-3xl font-bold mt-2">{stat.value}</p>
      <p className={"text-green-500"}>
        {stat.change}
      </p>
      </div>
      ))}
      </div>


      {/* Signature Growth Chart */}
      <h2 className="text-xl font-semibold mb-4">Signature Growth</h2>
      <div className="bg-white shadow-lg p-4 rounded-lg mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={signatureGrowth}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="signatures" stroke="#2563eb" strokeWidth={1} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Active Petitions */}
      <h2 className="text-xl font-semibold mb-4">Active Petitions</h2>
      <div className="bg-white shadow-lg p-4 rounded-lg">
        {activePetitions.map((petition, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{petition.name}</h3>
            <p className="text-sm text-gray-500">Created on {petition.created}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="h-2 rounded-full"
            style={{ backgroundColor: "#CA3C25", width: `${(petition.signed / petition.goal) * 80}%` }}></div>

            </div>
            <p className="text-sm text-gray-600">{petition.signed} / {petition.goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
