"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const subjects = [
  "Precis and Composition",
  "Pakistan Affairs",
  "Islamiyat",
  "Current Affairs",
  "General Science and Ability",
];

const years = Array.from({ length: 11 }, (_, i) => 2014 + i);

export default function StudentMCQsPage() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false); // 🌀 spinner state

  const totalTime = 60 * 2;

  useEffect(() => {
    let timer;
    if (timerRunning && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timerRunning && timeLeft === 0) {
      setTimerRunning(false);
      setShowScore(true);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerRunning]);

  const handleFetch = async () => {
    if (!subject || !year) return;
    setLoading(true); // start spinner
    const q = query(
      collection(db, "mcqs"),
      where("subject", "==", subject),
      where("year", "==", Number(year))
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMcqs(data);
    setAnswers({});
    setTimeLeft(totalTime);
    setTimerRunning(true);
    setShowScore(false);
    setLoading(false); // stop spinner
  };

  const handleOptionSelect = (mcqId, selectedIndex) => {
    if (!timerRunning) return;
    setAnswers((prev) => ({
      ...prev,
      [mcqId]: selectedIndex,
    }));
  };

  const correctCount = mcqs.filter(
    (mcq) => answers[mcq.id] === mcq.correctAnswer
  ).length;
  const incorrectCount = Object.keys(answers).length - correctCount;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Practice MCQs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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

        {/* <button
          onClick={handleFetch}
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          ) : (
            'Load MCQs'
          )}
        </button> */}
        <button
          onClick={handleFetch}
          disabled={!subject || !year}
          className={`rounded p-2 text-white ${
            !subject || !year
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {!subject || !year ? (
            "Please select subject and year"
          ) : loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Loading...
            </span>
          ) : (
            "Load MCQs"
          )}
        </button>
      </div>

      {timerRunning && (
        <div className="mb-4 text-lg font-bold text-red-600">
          Time Left: {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      )}

      <div className="space-y-6">
        {mcqs.map((mcq, index) => {
          const selected = answers[mcq.id];
          const isCorrect = selected === mcq.correctAnswer;

          return (
            <div key={mcq.id} className="border p-4 rounded shadow">
              <p className="font-semibold mb-2">
                Q{index + 1}. {mcq.question}
              </p>
              <div className="space-y-2">
                {mcq.options.map((option, idx) => {
                  const selectedThis = selected === idx;
                  const correct = mcq.correctAnswer === idx;

                  const optionStyle =
                    selected != null
                      ? correct
                        ? "bg-green-100 text-green-800 font-semibold border border-green-500"
                        : selectedThis
                        ? "bg-red-100 text-red-700 font-semibold border border-red-500"
                        : "border"
                      : "border";

                  return (
                    <label
                      key={idx}
                      className={`flex items-center space-x-2 p-2 rounded ${optionStyle}`}
                    >
                      {/* <input
                        type="radio"
                        name={`mcq-${mcq.id}`}
                        disabled={!timerRunning}
                        checked={selected === idx}
                        onChange={() => handleOptionSelect(mcq.id, idx)}
                      /> */}
                      <input
                        type="radio"
                        name={`mcq-${mcq.id}`}
                        disabled={selected != null || !timerRunning} // ✅ disable after selection
                        checked={selected === idx}
                        onChange={() => handleOptionSelect(mcq.id, idx)}
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>

              {selected != null && (
                <p
                  className={`mt-2 ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isCorrect
                    ? "✅ Correct"
                    : `❌ Incorrect. Correct Answer: ${
                        mcq.options[mcq.correctAnswer]
                      }`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Show Check Score Button */}
      {mcqs.length > 0 &&
        (Object.keys(answers).length === mcqs.length || !timerRunning) &&
        !showScore && (
          <div className="mt-6">
            <button
              onClick={() => {
                setShowScore(true);
                setTimerRunning(false);
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Check Your Score
            </button>
          </div>
        )}

      {/* Score Modal */}
      {/* {showScore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Your Score</h2>
            <p className="mb-2">✅ Correct Answers: {correctCount}</p>
            <p className="mb-2">❌ Incorrect Answers: {incorrectCount}</p>
            <p className="mb-4">
              📊 Total Score: {correctCount} / {mcqs.length}
            </p>
            <button
              onClick={() => setShowScore(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )} */}
        {showScore && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
      <h2 className="text-xl font-bold mb-4">Your Score</h2>
      <p className="mb-2">✅ Correct Answers: {correctCount}</p>
      <p className="mb-2">❌ Incorrect Answers: {incorrectCount}</p>
      <p className="mb-4">📊 Total Score: {correctCount} / {mcqs.length}</p>

      <div className="flex justify-between gap-4">
        <button
          onClick={() => setShowScore(false)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-1/2"
        >
          Close
        </button>
        <button
          onClick={() => {
            setAnswers({});
            setTimeLeft(0);
            setShowScore(false);
            setTimerRunning(false);
            handleFetch(); // 🔁 reload same MCQs
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-1/2"
        >
          Attempt Again
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
