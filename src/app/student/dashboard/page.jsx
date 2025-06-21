'use client';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const cards = [
    { title: 'Past Papers', path: 'past-papers', emoji: '📝' },
    { title: 'Syllabus', path: 'syllabus', emoji: '📄' },
    { title: 'Past Paper MCQs', path: 'mcqs', emoji: '❓' },
    { title: 'Quotes', path: 'quotes', emoji: '💬' },
    { title: 'Recommended Books', path: 'books', emoji: '📚' },
    { title: 'Reports', path: 'reports', emoji: '📊' },
    { title: 'Current Affairs', path: 'current-affairs', emoji: '🌍' },
    { title: 'Grammar', path: 'grammar', emoji: '✍️' },
    { title: 'Facts & Figures', path: 'facts', emoji: '📌' },
  ];

  return (
    // <main className="min-h-screen bg-blue-50 px-4 py-10">
     <main>
      <div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={() => router.push(`/student/dashboard/${card.path}`)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer hover:bg-blue-100"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {card.emoji} {card.title}
              </h2>
              <p className="text-gray-600 text-sm">
                Explore the {card.title} section here.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
