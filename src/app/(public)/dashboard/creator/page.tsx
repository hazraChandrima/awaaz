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
import { auth } from "../../../../firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { db } from "../../../../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa6";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [petitionData, setPetitionData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "petitions"),
      where("userId", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const petitions = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPetitionData(petitions);
      },
      (error) => {
        setError("Failed to fetch petitions");
        console.error("Error fetching petitions:", error);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "petitions", id));
      setPetitionData((prevData) =>
        prevData.filter((petition) => petition.id !== id)
      );
    } catch (err) {
      console.error("Error deleting petition:", err);
      setError("Failed to delete petition");
    }
  };

  // Dummy Data for Charts
  const dummySignatureGrowth = [
    { date: "01/01/2024", signatures: 5 },
    { date: "02/01/2024", signatures: 12 },
    { date: "03/01/2024", signatures: 9 },
    { date: "04/01/2024", signatures: 15 },
  ];

  const dummyPetitionPopularity = [
    { name: "Save the Forests", popularity: 85 },
    { name: "Clean Water Initiative", popularity: 70 },
    { name: "Education for All", popularity: 90 },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">Loading dashboard...</div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-4">Overview of your petition campaigns</p>

      {/* Graphs Section */}
      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        {/* Signature Growth Chart */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Signature Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dummySignatureGrowth}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="signatures"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Popularity Chart */}
        <div className="bg-white shadow-lg p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">
            Popularity of Petitions
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dummyPetitionPopularity}>
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
    </div>
  );
};

export default Dashboard;