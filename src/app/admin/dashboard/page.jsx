"use client";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  const cards = [
    { title: "Past Papers", path: "past-papers", emoji: "📝" },
    { title: "Syllabus", path: "syllabus", emoji: "📄" },
    { title: "MCQs", path: "mcqs", emoji: "❓" },
    { title: "Quotes", path: "quotes", emoji: "💬" },
    { title: "Recommended Books", path: "books", emoji: "📚" },
    { title: "Reports", path: "reports", emoji: "📊" },
    { title: "Current Affairs", path: "current-affairs", emoji: "🌍" },
    { title: "Grammar", path: "grammar", emoji: "✍️" },
    { title: "Facts & Figures", path: "facts", emoji: "📌" },
  ];

  return (
    // <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
    <main>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => router.push(`/admin/dashboard/${card.path}`)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border border-blue-100 hover:border-blue-200"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {card.emoji} {card.title}
            </h2>
            <p className="text-gray-600">
              Manage all {card.title.toLowerCase()} here.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
