"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const subjects = [
  "Precis and Composition",
  "Pakistan Affairs",
  "Islamiyat",
  "Current Affairs",
  "General Science and Ability",
];

const years = Array.from({ length: 11 }, (_, i) => 2014 + i);

const topics = [
  "Terrorism",
  "Climate Change",
  "Education System",
  "Women's Rights",
  "Pak-China Relations",
  "Energy Crisis",
  "Corruption",
  "Foreign Policy",
];

export default function PastPaperAnalysisPage() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [analysisList, setAnalysisList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAnalysis = async () => {
    const snapshot = await getDocs(collection(db, "past_paper_analysis"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAnalysisList(data);
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !year || !topic || !question) return;
    setLoading(true);

    if (editingId) {
      const ref = doc(db, "past_paper_analysis", editingId);
      await updateDoc(ref, {
        subject,
        year: Number(year),
        topic,
        question,
      });
      setEditingId(null);
    } else {
      await addDoc(collection(db, "past_paper_analysis"), {
        subject,
        year: Number(year),
        topic,
        question,
        createdAt: serverTimestamp(),
      });
    }

    setSubject("");
    setYear("");
    setTopic("");
    setQuestion("");
    setLoading(false);
    fetchAnalysis();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "past_paper_analysis", id));
    fetchAnalysis();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setSubject(item.subject);
    setYear(item.year.toString());
    setTopic(item.topic);
    setQuestion(item.question);
  };

  const handleCancel = () => {
    setEditingId(null);
    setSubject("");
    setYear("");
    setTopic("");
    setQuestion("");
  };

  // Group by topic
  const groupedByTopic = analysisList.reduce((acc, item) => {
    if (!acc[item.topic]) {
      acc[item.topic] = [];
    }
    acc[item.topic].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📚 Past Paper Analysis (Admin)
      </h1>

      {/* CENTERED FORM */}
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-2xl text-center"
        >
          <select
            className="border p-2 rounded w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded w-full"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select
            className="border p-2 rounded w-full"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="">Select Topic</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Enter full question"
            className="border p-2 rounded w-full"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 text-white px-4 py-2 rounded ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {editingId ? "Update" : "Save"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* GROUPED BY TOPIC */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">📦 Topic-wise Analysis</h2>

        {Object.entries(groupedByTopic).length === 0 ? (
          <p className="text-gray-600">No data available.</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedByTopic).map(([topic, items]) => (
              <div key={topic} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-bold mb-2 text-blue-800">
                  {topic}
                </h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="border rounded p-3 flex justify-between items-start"
                    >
                      <div>
                        <p className="text-sm text-gray-600">
                          {item.subject} - {item.year}
                        </p>
                        <p className="mt-1">{item.question}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-500 hover:text-blue-700 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
