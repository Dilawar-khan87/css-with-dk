"use client";

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function StudentGREPage() {
  const [exerciseNumber, setExerciseNumber] = useState("");
  const [exercises, setExercises] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [exercise, setExercise] = useState(null);

  const exerciseNumbers = Array.from({ length: 50 }, (_, i) => i + 1); // 1 to 50

  const typeColors = {
    synonym: "bg-blue-100 text-blue-800 border-blue-300",
    antonym: "bg-green-100 text-green-800 border-green-300",
  };

  const handleFetch = async () => {
    if (!exerciseNumber) return;
    setLoading(true);
    const q = query(
      collection(db, "gre_exercises"),
      where("exerciseNumber", "==", Number(exerciseNumber))
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (data.length > 0) {
      setExercise(data[0]);
      setExercises(data[0].words || []);
    } else {
      setExercise(null);
      setExercises([]);
    }
    setAnswers({});
    setShowScore(false);
    setLoading(false);
  };

  const handleOptionSelect = (index, selectedIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: selectedIndex,
    }));
  };

  const correctCount = exercises.filter(
    (ex, idx) => answers[idx] === ex.correctAnswer
  ).length;
  const incorrectCount = Object.keys(answers).length - correctCount;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Practice GRE Exercises</h1>

      <div className="flex gap-4 mb-6 items-center">
        <select
          className="border p-2 rounded w-full sm:w-auto"
          value={exerciseNumber}
          onChange={(e) => setExerciseNumber(e.target.value)}
        >
          <option value="">Select Exercise Number</option>
          {exerciseNumbers.map((num) => (
            <option key={num} value={num}>
              Exercise {num}
            </option>
          ))}
        </select>

        <button
          onClick={handleFetch}
          disabled={!exerciseNumber}
          className={`rounded px-4 py-2 text-white ${
            !exerciseNumber
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2"
                viewBox="0 0 24 24"
              >
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
            "Load Exercise"
          )}
        </button>
      </div>

      {exercise && (
        <div className="mb-6 flex justify-center">
          <span
            className={`inline-block text-lg font-bold px-4 py-2 rounded-full shadow-sm border ${
              typeColors[exercise.type] ||
              "bg-gray-100 text-gray-800 border-gray-300"
            }`}
          >
            🧠 Exercise Type: {exercise.type.toUpperCase()}
          </span>
        </div>
      )}

      <div className="space-y-6">
        {exercises.map((ex, index) => {
          const selected = answers[index];
          const isCorrect = selected === ex.correctAnswer;

          return (
            <div key={index} className="border p-4 rounded shadow">
              <p className="font-semibold mb-2">
                Q{index + 1}. {ex.word}
              </p>
              <div className="space-y-2">
                {ex.options.map((option, idx) => {
                  const selectedThis = selected === idx;
                  const correct = ex.correctAnswer === idx;

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
                      <input
                        type="radio"
                        name={`ex-${index}`}
                        disabled={selected != null}
                        checked={selected === idx}
                        onChange={() => handleOptionSelect(index, idx)}
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
                        ex.options[ex.correctAnswer]
                      }`}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Show Check Score Button */}
      {exercises.length > 0 &&
        Object.keys(answers).length === exercises.length &&
        !showScore && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowScore(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
            >
              Check Your Score
            </button>
          </div>
        )}

      {/* Score Modal */}
      {showScore && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Your Score</h2>
            <p className="mb-2">✅ Correct Answers: {correctCount}</p>
            <p className="mb-2">❌ Incorrect Answers: {incorrectCount}</p>
            <p className="mb-4">
              📊 Total Score: {correctCount} / {exercises.length}
            </p>

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
                  setShowScore(false);
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
