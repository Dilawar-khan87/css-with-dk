'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Download, Search, X } from 'lucide-react';

const ITEMS_PER_PAGE = 5;

export default function StudentBookSummaries() {
  const [summaries, setSummaries] = useState([]);
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchSummaries = async () => {
    const snap = await getDocs(collection(db, 'summariesNoStorage'));
    const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSummaries(data);
    setFilteredSummaries(data);
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const downloadPDF = (base64, filename) => {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${base64}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSearch = () => {
    const search = searchText.toLowerCase().trim();
    const results = summaries.filter(
      item =>
        item.name.toLowerCase().includes(search) ||
        item.writer.toLowerCase().includes(search)
    );
    setFilteredSummaries(results);
    setCurrentPage(1); // reset to page 1 on search
  };

  const handleReset = () => {
    setSearchText('');
    setFilteredSummaries(summaries);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredSummaries.length / ITEMS_PER_PAGE);
  const currentItems = filteredSummaries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-800">📚 Book Summaries</h1>

      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search by book name or writer..."
          className="border border-gray-300 px-4 py-2 rounded w-full sm:w-1/2"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <Search size={16} /> Search
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          <X size={16} /> Reset
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Writer</th>
              <th className="p-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No summaries found.
                </td>
              </tr>
            ) : (
              currentItems.map(item => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.writer}</td>
                  <td className="p-2 text-right">
                    <button
                      onClick={() => downloadPDF(item.fileBase64, item.fileName)}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                    >
                      <Download size={16} /> Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
