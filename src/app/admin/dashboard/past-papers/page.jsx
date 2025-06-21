'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const subjects = [
  'English Essay',
  'Precis and Composition',
  'Pakistan Affairs',
  'Islamiyat',
  'Current Affairs',
  'General Science and Ability',
  // Add remaining subjects
];

const years = Array.from({ length: 11 }, (_, i) => 2014 + i);
const defaultQuestionTemplate = `Q1.\nQ2.\nQ3.\nQ4.\nQ5.\nQ6.\nQ7.`;
const PAGE_SIZE = 5;

export default function PastPapersPage() {
  const [subject, setSubject] = useState('');
  const [year, setYear] = useState('');
  const [question, setQuestion] = useState(defaultQuestionTemplate);
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPapers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [papers, filterSubject, filterYear, searchText]);

  const fetchPapers = async () => {
    const snapshot = await getDocs(collection(db, 'pastPapers'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPapers(data);
  };

  const applyFilters = () => {
    let results = [...papers];
    if (filterSubject) {
      results = results.filter(p => p.subject === filterSubject);
    }
    if (filterYear) {
      results = results.filter(p => p.year.toString() === filterYear);
    }
    if (searchText.trim()) {
      results = results.filter(p => p.question.toLowerCase().includes(searchText.toLowerCase()));
    }
    setFilteredPapers(results);
    setCurrentPage(1);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!subject || !year || !question) return;
    await addDoc(collection(db, 'pastPapers'), {
      subject,
      year,
      question,
      createdAt: serverTimestamp(),
    });
    setSubject('');
    setYear('');
    setQuestion(defaultQuestionTemplate);
    fetchPapers();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'pastPapers', id));
    fetchPapers();
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, 'pastPapers', id), {
      question: editQuestion,
    });
    setEditingId(null);
    setEditQuestion('');
    fetchPapers();
  };

  const paginatedPapers = filteredPapers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const totalPages = Math.ceil(filteredPapers.length / PAGE_SIZE);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Past Paper Questions</h1>

      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <select
          className="border p-2 rounded"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
        <textarea
          rows={7}
          className="sm:col-span-3 border p-2 rounded resize-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </form>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <select
          className="border p-2 rounded"
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
        >
          <option value="">Filter by Subject</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">Filter by Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search questions..."
          className="border p-2 rounded flex-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">All Past Papers</h2>
      <div className="space-y-4">
        {paginatedPapers.map((paper) => (
          <div key={paper.id} className="border p-4 rounded shadow">
            <p className="text-sm text-gray-600">
              <strong>{paper.subject}</strong> | {paper.year}
            </p>
            {editingId === paper.id ? (
              <div className="mt-2">
                <textarea
                  className="w-full border p-2 rounded"
                  rows={7}
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                />
                <button
                  onClick={() => handleUpdate(paper.id)}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="mt-2 ml-2 bg-gray-400 text-white px-4 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <pre className="mt-2 whitespace-pre-wrap">{paper.question}</pre>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(paper.id);
                      setEditQuestion(paper.question);
                    }}
                    className="bg-yellow-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(paper.id)}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
