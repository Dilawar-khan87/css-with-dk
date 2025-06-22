'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Loader2 } from 'lucide-react';

export default function PrecisChecker() {
  const [originalText, setOriginalText] = useState('');
  const [precisText, setPrecisText] = useState('');
  const [precisTitle, setPrecisTitle] = useState('');
  const [marks, setMarks] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);

  const evaluateText = async () => {
    let score = 0;
    let checks = [];
    setLoading(true);

    // 1. Word limit (1/3)
    const originalWordCount = originalText.trim().split(/\s+/).length;
    const precisWordCount = precisText.trim().split(/\s+/).length;
    const withinLimit = precisWordCount <= Math.ceil(originalWordCount / 3);
    if (withinLimit) {
      score += 2;
      checks.push({ label: 'Word limit (within 1/3)', passed: true });
    } else {
      checks.push({ label: 'Word limit (within 1/3)', passed: false });
    }

    // 2. Grammar
    const grammarCorrect = await grammarCheck(precisText);
    if (grammarCorrect) {
      score += 2;
      checks.push({ label: 'Correct Grammar', passed: true });
    } else {
      checks.push({ label: 'Correct Grammar', passed: false });
    }

    // 3. No personal opinion
    const hasPersonalOpinion = /(i think|in my opinion|i believe|we should|my view)/i.test(precisText);
    if (!hasPersonalOpinion) {
      score += 2;
      checks.push({ label: 'No Personal Opinion', passed: true });
    } else {
      checks.push({ label: 'No Personal Opinion', passed: false });
    }

    // 4. Main idea coverage
    const hasMainIdea = /(main|core|central|key|focus|idea)/i.test(precisText);
    if (hasMainIdea) {
      score += 2;
      checks.push({ label: 'Main Idea Coverage', passed: true });
    } else {
      checks.push({ label: 'Main Idea Coverage', passed: false });
    }

    // 5. Coherence
    const hasFlow = /(however|moreover|thus|therefore|in addition|for example)/i.test(precisText);
    if (hasFlow) {
      score += 2;
      checks.push({ label: 'Coherence', passed: true });
    } else {
      checks.push({ label: 'Coherence', passed: false });
    }

    // 6. Own words
    const copyRatio = precisText.length / originalText.length;
    if (copyRatio < 0.9) {
      score += 2;
      checks.push({ label: 'Use of Own Words', passed: true });
    } else {
      checks.push({ label: 'Use of Own Words', passed: false });
    }

    // 7. Relevancy to original passage
    const isRelevant = /(topic|subject|point|discussed|context)/i.test(precisText);
    if (isRelevant) {
      score += 3;
      checks.push({ label: 'Relevancy to Original Passage', passed: true });
    } else {
      checks.push({ label: 'Relevancy to Original Passage', passed: false });
    }

    // 8. Title relevance
    const titleRelevant = precisTitle.trim().length > 0 && new RegExp(precisTitle.trim(), 'i').test(originalText);
    if (titleRelevant) {
      score += 5;
      checks.push({ label: 'Title Relevant to Passage', passed: true });
    } else {
      checks.push({ label: 'Title Relevant to Passage', passed: false });
    }

    setMarks(score);
    setFeedback(checks);
    setLoading(false);
  };

  const grammarCheck = async (paragraph) => {
    try {
      const res = await fetch('https://api.languagetoolplus.com/v2/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ text: paragraph, language: 'en-US' }),
      });
      const result = await res.json();
      return result.matches.length < 3;
    } catch (err) {
      console.error('Grammar check failed', err);
      return false;
    }
  };

  const handleReset = () => {
    setMarks(null);
    setFeedback([]);
    setOriginalText('');
    setPrecisText('');
    setPrecisTitle('');
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">📝 Precis Evaluation</h1>

      <textarea
        rows={6}
        value={originalText}
        onChange={e => setOriginalText(e.target.value)}
        placeholder="Original Passage"
        className="w-full border p-3 rounded mb-4"
      />

      <input
        type="text"
        value={precisTitle}
        onChange={e => setPrecisTitle(e.target.value)}
        placeholder="Title of Precis"
        className="w-full border p-3 rounded mb-4"
      />

      <textarea
        rows={6}
        value={precisText}
        onChange={e => setPrecisText(e.target.value)}
        placeholder="Precis Passage"
        className="w-full border p-3 rounded mb-4"
      />

      <div className="flex gap-3 mb-6">
        <button
          onClick={evaluateText}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : null} Evaluate
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      {marks !== null && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Evaluation Result</h2>
          <ul className="mb-4 space-y-2">
            {feedback.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                {item.passed ? (
                  <CheckCircle size={18} className="text-green-600" />
                ) : (
                  <XCircle size={18} className="text-red-600" />
                )}
                {item.label}
              </li>
            ))}
          </ul>
          <p className="font-medium">
            Total Marks: <span className="font-bold">{marks}/20</span> —{' '}
            {marks >= 12 ? (
              <span className="text-green-600">Passed ✅</span>
            ) : (
              <span className="text-red-600">Failed ❌</span>
            )}
          </p>
        </div>
      )}
    </main>
  );
}
