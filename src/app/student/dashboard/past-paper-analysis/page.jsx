"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const subjects = [
  "Precis and Composition",
  "Pakistan Affairs",
  "Islamiyat",
  "Current Affairs",
  "General Science and Ability",
];

export default function PastPaperAnalysisStudent() {
  const [analysisList, setAnalysisList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(""); // new
  const [loading, setLoading] = useState(true);

  const fetchAnalysis = async () => {
    const snapshot = await getDocs(collection(db, "past_paper_analysis"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAnalysisList(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  // Filtered data based on selected subject
  const filteredAnalysis = selectedSubject
    ? analysisList.filter((item) => item.subject === selectedSubject)
    : analysisList;

  // Group by topic
  const groupedByTopic = filteredAnalysis.reduce((acc, item) => {
    if (!acc[item.topic]) {
      acc[item.topic] = [];
    }
    acc[item.topic].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-800">
        📘 Past Paper Analysis (Student View)
      </h1>

      {/* Subject Filter */}
      <div className="mb-6 max-w-md mx-auto">
        <select
          className="border border-gray-300 rounded p-2 w-full"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : Object.entries(groupedByTopic).length === 0 ? (
        <p className="text-center text-gray-500">
          No data available for this subject.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(groupedByTopic).map(([topic, items]) => (
            <div key={topic} className="bg-white rounded shadow p-4">
              <h2 className="text-lg font-semibold text-blue-700 mb-2">
                {topic}
              </h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.id} className="border rounded p-3">
                    <p className="text-sm text-gray-500">
                      {item.subject} - {item.year}
                    </p>
                    <p className="mt-1">{item.question}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
