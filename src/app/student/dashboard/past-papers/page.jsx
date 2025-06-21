'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function StudentPastPapers() {
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  const subjects = [
    'English Essay',
    'Precis and Composition',
    'Pakistan Affairs',
    'Islamiyat',
    'Current Affairs',
    'General Science and Ability',
    // Add remaining subjects if needed
  ];

  const years = Array.from({ length: 11 }, (_, i) => 2014 + i);

  useEffect(() => {
    fetchPapers();
  }, []);

  useEffect(() => {
    filterPapers();
  }, [search, subjectFilter, yearFilter, papers]);

  const fetchPapers = async () => {
    const snapshot = await getDocs(collection(db, 'pastPapers'));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPapers(data);
  };

  const filterPapers = () => {
    let filtered = papers;

    if (subjectFilter) {
      filtered = filtered.filter((p) => p.subject === subjectFilter);
    }
    if (yearFilter) {
      filtered = filtered.filter((p) => p.year.toString() === yearFilter);
    }
    if (search) {
      filtered = filtered.filter((p) =>
        p.question.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredPapers(filtered);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Past Papers</h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((subj) => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <input
          type="text"
          className="border p-2 rounded col-span-2"
          placeholder="Search by question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredPapers.length === 0 ? (
          <p className="text-gray-500">No papers found.</p>
        ) : (
          filteredPapers.map((paper, index) => (
            <div key={paper.id} className="border p-4 rounded shadow">
              <p className="text-sm text-gray-600">
                <strong>{paper.subject}</strong> | {paper.year}
              </p>
              <p className="mt-1">Q{index + 1}. {paper.question}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
