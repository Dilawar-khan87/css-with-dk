'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-6 py-4 shadow bg-white"
      >
        <h1 className="text-2xl font-bold text-blue-600">CSS-with-DK</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold mb-4"
        >
          Prepare for CSS Exam with Confidence!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-600 mb-8"
        >
          Access top-quality notes, video lectures, past papers, and more. Learn anytime, anywhere with CSS-with-DK.
        </motion.p>

        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Start Preparing Now
          </motion.button>
        </Link>
      </section>

      {/* Features Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="py-12 bg-white"
      >
        <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto text-center">
          {[
            {
              title: '🎓 Compulsory & Optional Subjects',
              desc: 'All CSS subjects with study materials.',
            },
            {
              title: '📝 MCQs & Mock Tests',
              desc: 'Practice real exam questions with time tracking.',
            },
            {
              title: '📰 Current Affairs & Notes',
              desc: 'Updated summaries, notes, and downloads.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-6 shadow-md rounded bg-blue-50 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} CSS-with-DK. All rights reserved.
      </footer>
    </main>
  );
}
