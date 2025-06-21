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

const Vocabulary = () => {
  const [type, setType] = useState("synonym");
  const [exerciseNumber, setExerciseNumber] = useState(1);
  const [words, setWords] = useState(
    Array.from({ length: 15 }, () => ({
      word: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    }))
  );
  const [exercises, setExercises] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [filterNumber, setFilterNumber] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingWords, setEditingWords] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    const snapshot = await getDocs(collection(db, "gre_exercises"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setExercises(data);
  };

  const handleWordChange = (index, field, value) => {
    const updatedWords = [...words];
    if (field === "word") {
      updatedWords[index].word = value;
    } else if (field === "correctAnswer") {
      updatedWords[index].correctAnswer = Number(value);
    }
    setWords(updatedWords);
  };

  const handleOptionChange = (wordIndex, optionIndex, value) => {
    const updatedWords = [...words];
    updatedWords[wordIndex].options[optionIndex] = value;
    setWords(updatedWords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const incomplete = words.some(
      (w) => !w.word || w.options.some((opt) => !opt)
    );
    if (incomplete) return alert("Please complete all 15 words.");

    await addDoc(collection(db, "gre_exercises"), {
      type,
      exerciseNumber,
      words,
      createdAt: serverTimestamp(),
    });

    alert("Exercise added!");
    setExerciseNumber((prev) => (prev < 50 ? prev + 1 : 1));
    setWords(
      Array.from({ length: 15 }, () => ({
        word: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      }))
    );
    fetchExercises();
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this exercise?")) {
      await deleteDoc(doc(db, "gre_exercises", id));
      fetchExercises();
    }
  };

  const handleEdit = (ex) => {
    setEditingId(ex.id);
    setEditingWords(JSON.parse(JSON.stringify(ex.words)));
  };

  const handleEditChange = (wordIndex, field, value) => {
    const updated = [...editingWords];
    if (field === "word") {
      updated[wordIndex].word = value;
    } else if (field === "correctAnswer") {
      updated[wordIndex].correctAnswer = Number(value);
    }
    setEditingWords(updated);
  };

  const handleEditOption = (wordIndex, optionIndex, value) => {
    const updated = [...editingWords];
    updated[wordIndex].options[optionIndex] = value;
    setEditingWords(updated);
  };

  const handleUpdate = async (id) => {
    const incomplete = editingWords.some(
      (w) => !w.word || w.options.some((opt) => !opt)
    );
    if (incomplete) return alert("Fill all fields before saving.");

    setIsSaving(true);
    try {
      await updateDoc(doc(db, "gre_exercises", id), {
        words: editingWords,
      });
      alert("Exercise updated.");
      setEditingId(null);
      setEditingWords([]);
      fetchExercises();
    } catch (err) {
      alert("Error updating exercise");
    }
    setIsSaving(false);
  };

  const filteredExercises = exercises.filter((ex) => {
    return (
      (!filterType || ex.type === filterType) &&
      (!filterNumber || ex.exerciseNumber === Number(filterNumber))
    );
  });

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Add GRE Exercise</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="synonym">Synonym</option>
            <option value="antonym">Antonym</option>
          </select>

          <select
            value={exerciseNumber}
            onChange={(e) => setExerciseNumber(Number(e.target.value))}
            className="border p-2 rounded"
          >
            {Array.from({ length: 50 }, (_, i) => (
              <option key={i} value={i + 1}>
                Exercise {i + 1}
              </option>
            ))}
          </select>
        </div>

        {words.map((wordData, idx) => (
          <div
            key={idx}
            className="border rounded p-4 bg-gray-50 shadow-sm space-y-2"
          >
            <h3 className="font-semibold text-lg">Word {idx + 1}</h3>
            <input
              type="text"
              placeholder="Enter word"
              value={wordData.word}
              onChange={(e) => handleWordChange(idx, "word", e.target.value)}
              className="border p-2 w-full rounded"
            />
            <div className="grid grid-cols-2 gap-2">
              {wordData.options.map((opt, optionIdx) => (
                <input
                  key={optionIdx}
                  type="text"
                  placeholder={`Option ${optionIdx + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(idx, optionIdx, e.target.value)
                  }
                  className="border p-2 rounded"
                />
              ))}
            </div>
            <select
              value={wordData.correctAnswer}
              onChange={(e) =>
                handleWordChange(idx, "correctAnswer", e.target.value)
              }
              className="border p-2 rounded"
            >
              <option value={0}>Correct: Option 1</option>
              <option value={1}>Correct: Option 2</option>
              <option value={2}>Correct: Option 3</option>
              <option value={3}>Correct: Option 4</option>
            </select>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Exercise
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">All Exercises</h2>

        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Types</option>
            <option value="synonym">Synonym</option>
            <option value="antonym">Antonym</option>
          </select>

          <select
            value={filterNumber}
            onChange={(e) => setFilterNumber(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Exercises</option>
            {Array.from({ length: 50 }, (_, i) => (
              <option key={i} value={i + 1}>
                Exercise {i + 1}
              </option>
            ))}
          </select>
        </div>

        {filteredExercises.map((ex) => (
          <div
            key={ex.id}
            className="border p-4 rounded bg-white space-y-2 shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div className="font-semibold">
                {ex.type.toUpperCase()} — Exercise {ex.exerciseNumber}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(ex)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ex.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            {editingId === ex.id ? (
              <>
                {editingWords.map((word, idx) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded space-y-1">
                    <input
                      className="border p-2 w-full rounded"
                      value={word.word}
                      onChange={(e) =>
                        handleEditChange(idx, "word", e.target.value)
                      }
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {word.options.map((opt, optIdx) => (
                        <input
                          key={optIdx}
                          className="border p-2 rounded"
                          value={opt}
                          onChange={(e) =>
                            handleEditOption(idx, optIdx, e.target.value)
                          }
                        />
                      ))}
                    </div>
                    <select
                      value={word.correctAnswer}
                      onChange={(e) =>
                        handleEditChange(idx, "correctAnswer", e.target.value)
                      }
                      className="border p-2 rounded"
                    >
                      <option value={0}>Correct: Option 1</option>
                      <option value={1}>Correct: Option 2</option>
                      <option value={2}>Correct: Option 3</option>
                      <option value={3}>Correct: Option 4</option>
                    </select>
                  </div>
                ))}
                <button
                  onClick={() => handleUpdate(ex.id)}
                  className="bg-green-600 text-white px-4 py-2 mt-2 rounded flex items-center gap-2"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3.5-3.5L12 1v4a8 8 0 100 16v-4l-3.5 3.5L12 23v-4a8 8 0 01-8-8z"
                      ></path>
                    </svg>
                  ) : (
                    "Save"
                  )}
                </button>
              </>
            ) : (
              <ul className="list-disc list-inside">
                {ex.words.map((w, idx) => (
                  <li key={idx}>
                    <strong>{w.word}</strong> —{" "}
                    {w.options[w.correctAnswer] || "No correct option"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vocabulary;
