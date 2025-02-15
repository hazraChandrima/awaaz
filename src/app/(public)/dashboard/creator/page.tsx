"use client";

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";

interface IPetition {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  scope: "local" | "national" | "global";
  userId: string;
  location: string;
  goal: number;
  signed_users: string[];
  createdAt: { seconds: number; nanoseconds: number };
  updatedAt: { seconds: number; nanoseconds: number };
}

const Dashboard = () => {
  const [petitions, setPetitions] = useState<IPetition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const response = await fetch("/api/petitions");
        const data = await response.json();
        setPetitions(data);
      } catch (error) {
        console.error("Error fetching petitions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPetitions();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  const petitionStats = [
    { title: "Total Signatures", value: petitions.reduce((sum, p) => sum + p.signed_users.length, 0), change: "+12.5%" },
    { title: "Active Petitions", value: petitions.length, change: "+1" },
    { title: "Success Rate", value: "85%", change: "+5.2%" },
    { title: "Avg. Daily Signatures", value: "156", change: "+8.2%" },
    { title: "Total Goals Combined", value: petitions.reduce((sum, p) => sum + p.goal, 0), change: "97.5%" },
    { title: "Most Successful", value: petitions.sort((a, b) => b.signed_users.length - a.signed_users.length)[0]?.title || "N/A", change: "5,678" },
  ];

  const signatureGrowth = petitions.map((petition, index) => ({
    date: `Petition ${index + 1}`,
    signatures: petition.signed_users.length,
  }));

  const petitionPopularity = petitions.map((petition) => ({
    name: petition.title,
    popularity: (petition.signed_users.length / petition.goal) * 100,
  }));

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">Overview of your petition campaigns</p>

      {/* Stats Section */}
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6 justify-center">
        {petitionStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-between text-center"
          >
            <h3 className="text-sm font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
            <p className={"text-green-500"}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        {/* Signature Growth Chart */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Signature Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={signatureGrowth}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="signatures" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popularity Chart */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Popularity of Petitions</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={petitionPopularity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="popularity" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Active Petitions */}
      <h2 className="text-lg font-semibold mb-2">Active Petitions</h2>
      <div className="bg-white shadow-lg p-4 rounded-lg">
        {petitions.map((petition, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{petition.title}</h3>
            <p className="text-xs text-gray-500">Created on {new Date(petition.createdAt.seconds * 1000).toLocaleDateString()}</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: "#CA3C25",
                  width: `${(petition.signed_users.length / petition.goal) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              {petition.signed_users.length} / {petition.goal}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
