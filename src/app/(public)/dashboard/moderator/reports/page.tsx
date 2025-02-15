"use client";

import { useState } from "react";
import Sidebar from "../_components/Sidebar";

const reportsData = [
  {
    id: 1,
    reportedBy: "John Doe",
    reportedDate: "2024-02-15",
    content: "Petition: Save the Forests",
    reason: "Misinformation",
    status: "Pending",
  },
  {
    id: 2,
    reportedBy: "Jane Smith",
    reportedDate: "2024-02-14",
    content: "User: spam_account_123",
    reason: "Spam",
    status: "Reviewed",
  },
];

const ReportsPage = () => {
  const [reports, setReports] = useState(reportsData);

  const handleResolve = (id: number) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, status: "Resolved" } : report
      )
    );
  };

  const handleDelete = (id: number) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="mt-20 p-6 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Reports</h1>
        <p className="mb-4 text-gray-700">View and manage reports submitted by users.</p>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Report ID</th>
                <th className="p-2 border">Reported By</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Content</th>
                <th className="p-2 border">Reason</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="text-center">
                  <td className="p-2 border">{report.id}</td>
                  <td className="p-2 border">{report.reportedBy}</td>
                  <td className="p-2 border">{report.reportedDate}</td>
                  <td className="p-2 border">{report.content}</td>
                  <td className="p-2 border">{report.reason}</td>
                  <td
                    className={`p-2 border font-semibold ${
                      report.status === "Resolved" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {report.status}
                  </td>
                  <td className="p-2 border">
                    {report.status !== "Resolved" && (
                      <button
                        onClick={() => handleResolve(report.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Resolve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(report.id)}
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

export default ReportsPage;

