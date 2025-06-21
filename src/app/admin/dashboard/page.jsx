"use client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          onClick={() => router.push(`/admin/dashboard/${card.path}`)}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
        >
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            {card.emoji} {card.title}
          </h2>
          <p className="text-gray-600">Explore the {card.title} section here.</p>
        </div>
      ))}
    </div>
  );
}
