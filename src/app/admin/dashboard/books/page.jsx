// 'use client';
// import { useEffect, useState } from 'react';
// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
//   serverTimestamp,
// } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

// export default function BookSummariesAdminNoStorage() {
//   const [name, setName] = useState('');
//   const [writer, setWriter] = useState('');
//   const [file, setFile] = useState(null);
//   const [percent, setPercent] = useState(null);
//   const [list, setList] = useState([]);

//   const fetchSummaries = async () => {
//     const snap = await getDocs(collection(db, 'summariesNoStorage'));
//     setList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//   };

//   useEffect(() => {
//     fetchSummaries();
//   }, []);

//   const upload = () => {
//     if (!name || !writer || !file) return alert('Fill all fields');
//     const reader = new FileReader();

//     reader.onprogress = (e) => {
//       if (e.lengthComputable) {
//         setPercent(Math.round((e.loaded / e.total) * 100));
//       }
//     };

//     reader.onloadend = async () => {
//       const base64 = reader.result.split(',')[1];
//       await addDoc(collection(db, 'summariesNoStorage'), {
//         name,
//         writer,
//         fileBase64: base64,
//         fileName: file.name,
//         timestamp: serverTimestamp(),
//       });
//       setName('');
//       setWriter('');
//       setFile(null);
//       setPercent(null);
//       alert('Uploaded via Firestore!');
//       fetchSummaries();
//     };

//     reader.onerror = () => alert('Read error!');
//     reader.readAsDataURL(file);
//   };

//   const remove = async (item) => {
//     await deleteDoc(doc(db, 'summariesNoStorage', item.id));
//     setList(list.filter(i => i.id !== item.id));
//   };

//   return (
//     <main className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">📚 Book Summaries (Base64 in Firestore)</h1>

//       <div className="bg-white p-4 rounded shadow mb-6 flex flex-col sm:flex-row gap-3 items-center">
//         <input
//           type="text"
//           placeholder="Book Name"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           className="border px-4 py-2 rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Writer"
//           value={writer}
//           onChange={e => setWriter(e.target.value)}
//           className="border px-4 py-2 rounded w-full"
//         />
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={e => setFile(e.target.files[0])}
//           className="border px-4 py-2 rounded w-full"
//         />
//         <button
//           onClick={upload}
//           className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//         >
//           {percent != null ? `Uploading ${percent}%` : 'Upload'}
//         </button>
//       </div>

//       <div className="bg-white rounded shadow p-4">
//         <table className="w-full table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left">Name</th>
//               <th className="p-2 text-left">Writer</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="text-center py-4 text-gray-500">
//                   No summaries found.
//                 </td>
//               </tr>
//             ) : (
//               list.map(item => (
//                 <tr key={item.id} className="border-t">
//                   <td className="p-2">{item.name}</td>
//                   <td className="p-2">{item.writer}</td>
//                   <td className="p-2">
//                     <a
//                       href={`data:application/pdf;base64,${item.fileBase64}`}
//                       download={item.fileName}
//                       className="text-blue-600 underline mr-4"
//                     >
//                       Download PDF
//                     </a>
//                     <button
//                       onClick={() => remove(item)}
//                       className="text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </main>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function BookSummariesAdminNoStorage() {
  const [name, setName] = useState('');
  const [writer, setWriter] = useState('');
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(null);
  const [list, setList] = useState([]);

  const fetchSummaries = async () => {
    const snap = await getDocs(collection(db, 'summariesNoStorage'));
    setList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const upload = () => {
    if (!name || !writer || !file) return alert('Fill all fields');
    const reader = new FileReader();

    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        setPercent(Math.round((e.loaded / e.total) * 100));
      }
    };

    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1];
      await addDoc(collection(db, 'summariesNoStorage'), {
        name,
        writer,
        fileBase64: base64,
        fileName: file.name,
        timestamp: serverTimestamp(),
      });
      setName('');
      setWriter('');
      setFile(null);
      setPercent(null);
      alert('Uploaded via Firestore!');
      fetchSummaries();
    };

    reader.onerror = () => alert('Read error!');
    reader.readAsDataURL(file);
  };

  const remove = async (item) => {
    const confirm = window.confirm(`Are you sure you want to delete "${item.name}"?`);
    if (!confirm) return;

    await deleteDoc(doc(db, 'summariesNoStorage', item.id));
    setList(list.filter(i => i.id !== item.id));
  };

  const downloadPDF = (base64, filename) => {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${base64}`;
    link.download = filename;
    link.click();
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📚 Book Summaries (Base64 in Firestore)</h1>

      <div className="bg-white p-4 rounded shadow mb-6 flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Book Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Writer"
          value={writer}
          onChange={e => setWriter(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
          className="border px-4 py-2 rounded w-full"
        />
        <button
          onClick={upload}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {percent != null ? `Uploading ${percent}%` : 'Upload'}
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Writer</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-500">
                  No summaries found.
                </td>
              </tr>
            ) : (
              list.map(item => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.writer}</td>
                  <td className="p-2">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => downloadPDF(item.fileBase64, item.fileName)}
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Download
                      </button>
                      <button
                        onClick={() => remove(item)}
                        className="flex items-center gap-1 text-red-600 hover:underline"
                      >
                        <TrashIcon className="w-5 h-5" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
