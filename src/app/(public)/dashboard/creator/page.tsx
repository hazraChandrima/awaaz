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
import React, { useState, useEffect } from "react";
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


  useEffect(() => {
    if (!currentUser) return;
    const q = query(collection(db, "petitions"), where("userId", "==", currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const petitions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPetitionData(petitions);
    }, (error) => {
      setError("Failed to fetch petitions");
      console.error("Error fetching petitions:", error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const petitionStats = [
    { 
      title: "Total Signatures", 
      value: petitionData.reduce((sum, p) => sum + (p.signed_users?.length || 0), 0).toLocaleString(),
      change: "+0%" 
    },
    { 
      title: "Active Petitions", 
      value: petitionData.length.toString(),
      change: "+0%" 
    },
    { 
      title: "Success Rate", 
      value: `${Math.round((petitionData.reduce((sum, p) => sum + (p.signed_users?.length || 0), 0) / 
        petitionData.reduce((sum, p) => sum + (p.goal || 0), 0)) * 100)}%`,
      change: "+0%" 
    },
    { 
      title: "Avg. Daily Signatures", 
      value: "0", 
      change: "+0%" 
    },
    { 
      title: "Total Goals Combined", 
      value: petitionData.reduce((sum, p) => sum + (p.goal || 0), 0).toLocaleString(),
      change: "0%" 
    },
    { 
      title: "Most Successful", 
      value: petitionData.reduce((a: any, b: any) => (a.signed_users?.length || 0) > (b.signed_users?.length || 0) ? a : b, { signed_users: [], title: "None" })?.title,
      change: "0" 
    },
  ];

  const activePetitions = petitionData.map(petition => ({
    name: petition.title,
    created: new Date(petition.createdAt?.seconds * 1000).toLocaleDateString(),
    signed: petition.signed_users?.length || 0,
    goal: petition.goal || 0
  }));

  const signatureGrowth = petitionData
    .flatMap(petition => 
      petition.signed_users?.map((timestamp: any) => ({
        date: new Date(timestamp?.seconds * 1000).toLocaleDateString(),
        signatures: 1
      })) || []
    )
    .reduce((acc: { date: string; signatures: number }[], curr) => {
      const existing = acc.find((item: { date: string }) => item.date === curr.date);
      if (existing) {
        existing.signatures += 1;
      } else {
        acc.push({ date: curr.date, signatures: 1 });
      }
      return acc;
    }, [] as { date: string, signatures: number }[])
    .sort((a: { date: string }, b: { date: string }) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const petitionPopularity = petitionData.map(petition => ({
    name: petition.title,
    popularity: Math.round((petition.signed_users?.length || 0) / (petition.goal || 1) * 100)
  }));

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
          <ResponsiveContainer width="极客时间" height={250}>
            <LineChart data={signatureGrowth}>
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
        {petitionData.map((petition) => (
          <div
            key={petition.id}
            className="mb-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{petition.title}</h3>
              <p className="text-xs text-gray-500">
                Created on{" "}
                {new Date(
                  petition.createdAt?.seconds * 1000
                ).toLocaleDateString()}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="h-2 rounded-full"
                  style={{
                    backgroundColor: "#CA3C25",
                    width: `${
                      ((petition.signed_users?.length || 0) /
                        (petition.goal || 1)) *
                      80
                    }%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-gray-600">
                {petition.signed_users?.length || 0} / {petition.goal || 0}
              </p>
            </div>
            <button
              className="bg-red-700 text-white px-4 py-2 rounded-lg flex space-x-2"
              onClick={() => handleDelete(petition.id)}
            >
              <div>Delete</div> 
              <FaTrash className="mt-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
