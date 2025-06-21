'use client';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

export default function AdminLayout({ children }) {
  const router = useRouter();


  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };



  return (
    <div>
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 flex justify-between text-white">
        <span className="font-bold">Welcome Admin</span>
        <button onClick={handleLogout} className="bg-white text-blue-600 px-4 py-1 rounded">
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
}
