'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Head from 'next/head';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800 font-sans">
      <Head>
        <title>CSS-with-DK | Prepare for CSS Exam</title>
        <meta
          name="description"
          content="Top-quality resources to prepare for the CSS exam. Notes, past papers, mock tests, and more."
        />
      </Head>

      {/* Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow bg-white/80 backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold text-blue-600">CSS-with-DK</h1>
        <div className="space-x-4">
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="text-center py-24 px-4 max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-6 text-blue-700"
        >
          Prepare for CSS Exam with Confidence!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg text-gray-700 mb-10"
        >
          Access top-quality notes, video lectures, past papers, and more. Learn anytime, anywhere with CSS-with-DK.
        </motion.p>

        <Link href="/signup">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition shadow-md"
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
        className="py-16 bg-white"
      >
        <div className="grid md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto text-center">
          {[
            {
              title: '🎓 Compulsory & Optional Subjects',
              desc: 'All CSS subjects with complete study materials and guidance.',
            },
            {
              title: '📝 MCQs & Mock Tests',
              desc: 'Timed practice tests and MCQs to test your preparation.',
            },
            {
              title: '📰 Current Affairs & Notes',
              desc: 'Updated content, downloadable notes, and quick revisions.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-6 shadow-md rounded-xl bg-blue-50 hover:shadow-xl transition-all"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 text-sm bg-white border-t">
        &copy; {new Date().getFullYear()} CSS-with-DK. All rights reserved.
      </footer>
    </main>
  );
}
