"use client";

import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const subjects = [
  // "English Essay",
  "Precis and Composition",
  "Pakistan Affairs",
  "Islamiyat",
  "Current Affairs",
  "General Science and Ability",
  // Add remaining subjects here
];

const years = Array.from({ length: 11 }, (_, i) => 2014 + i);

export default function MCQAdminPage() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [mcqs, setMcqs] = useState([]);

  useEffect(() => {
    fetchMCQs();
  }, []);

  const fetchMCQs = async () => {
    const snapshot = await getDocs(collection(db, "mcqs"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMcqs(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!subject || !year || !question || options.some((opt) => !opt)) return;

    await addDoc(collection(db, "mcqs"), {
      subject,
      year,
      question,
      options,
      correctAnswer,
      createdAt: serverTimestamp(),
    });

    setSubject("");
    setYear("");
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(0);
    fetchMCQs();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "mcqs", id));
    fetchMCQs();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add MCQ</h1>
      <form
        onSubmit={handleAdd}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
      >
        <select
          className="border p-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
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
        <textarea
          className="border p-2 rounded col-span-full"
          placeholder="Enter MCQ Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((opt, idx) => (
          <input
            key={idx}
            className="border p-2 rounded"
            placeholder={`Option ${idx + 1}`}
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[idx] = e.target.value;
              setOptions(newOptions);
            }}
          />
        ))}
        <select
          className="border p-2 rounded"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(Number(e.target.value))}
        >
          <option value={0}>Correct Answer: Option 1</option>
          <option value={1}>Correct Answer: Option 2</option>
          <option value={2}>Correct Answer: Option 3</option>
          <option value={3}>Correct Answer: Option 4</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add MCQ
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">All MCQs</h2>
      <div className="space-y-4">
        {mcqs.map((mcq) => (
          <div
            key={mcq.id}
            className="border p-4 rounded shadow bg-white space-y-2"
          >
            <div className="text-sm text-gray-600">
              <strong>{mcq.subject}</strong> | {mcq.year}
            </div>
            <p className="font-medium">{mcq.question}</p>
            <ul className="list-disc list-inside">
              {mcq.options.map((opt, idx) => (
                <li
                  key={idx}
                  className={
                    idx === mcq.correctAnswer ? "text-green-600 font-semibold" : ""
                  }
                >
                  {opt}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleDelete(mcq.id)}
              className="mt-2 bg-red-600 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
