"use client";
import Sidebar from "../_components/Sidebar";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

// Sample data for the Line Chart (Signers per month)
const lineData = [
  { month: "Jan", signers: 500 },
  { month: "Feb", signers: 1200 },
  { month: "Mar", signers: 2500 },
  { month: "Apr", signers: 3200 },
  { month: "May", signers: 4100 },
  { month: "Jun", signers: 5200 },
  { month: "Jul", signers: 6000 },
  { month: "Aug", signers: 7300 },
  { month: "Sep", signers: 7800 },
  { month: "Oct", signers: 8500 },
  { month: "Nov", signers: 9200 },
  { month: "Dec", signers: 10000 },
];

// Sample data for the Bar Chart (Popular Categories)
const barData = [
  { category: "Environment", petitions: 45 },
  { category: "Transport", petitions: 60 },
  { category: "Health", petitions: 30 },
  { category: "Education", petitions: 50 },
  { category: "Employment", petitions: 40 },
];

const Overview = () => {
  return (
    <div className="flex mt-20">
      <Sidebar />
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your petition campaigns</p>

        {/* Top Stats Boxes */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-3xl font-bold">7,892</p>
            <p className="text-green-500">+12.5%</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold">Active Petitions</h2>
            <p className="text-3xl font-bold">3</p>
            <p className="text-green-500">+1</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold">Success Rate</h2>
            <p className="text-3xl font-bold">85%</p>
            <p className="text-green-500">+5.2%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Line Chart (Signers per Month) */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-2">Signers on Website</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="signers" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart (Popular Categories) */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold mb-2">Popular Petition Categories</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="petitions" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
