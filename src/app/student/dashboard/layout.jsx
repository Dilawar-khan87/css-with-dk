"use client";
import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [userName, setUserName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserName((user.displayName || user.email).split("@")[0]);
    } else {
      router.push("/login");
    }
  });
  return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
      {/* Navbar */}
      <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-4">
        <span className="text-blue-900 font-semibold text-lg">
          👤 {userName || "Loading..."}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Logout
        </button>
      </nav>

      {/* Content Area */}
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
