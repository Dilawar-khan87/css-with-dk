"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

export default function ParagraphChecker() {
  const [text, setText] = useState("");
  const [section, setSection] = useState("");
  const [marks, setMarks] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const evaluateText = async () => {
    let score = 0;
    let checks = [];

    if (!section) return;

    const sentences = text.split(/[.?!]\s/);

    if (section === "introduction") {
      const firstSentence = sentences[0];
      const lastSentence = sentences[sentences.length - 1];

      const hasAttentionGrabber =
        /(!|imagine|did you know|what if|have you ever)/i.test(firstSentence);
      score += hasAttentionGrabber ? 2 : 0;
      checks.push({
        label: "Attention Grabber Sentence",
        passed: hasAttentionGrabber,
      });

      const grammarCorrect = await grammarCheck(text);
      score += grammarCorrect ? 2 : 0;
      checks.push({ label: "Correct Grammar", passed: grammarCorrect });

      const sentenceCount = sentences.length;
      const validCount = sentenceCount >= 14 && sentenceCount <= 16;
      score += validCount ? 2 : 0;
      checks.push({ label: "14–16 Sentences", passed: validCount });

      const hasThesis =
        /(should|must|need to|important|cause|because|therefore|thus|in conclusion|i believe|we should)/i.test(
          lastSentence
        );
      score += hasThesis ? 2 : 0;
      checks.push({ label: "Thesis Statement", passed: hasThesis });

      const hasFlow =
        /(however|moreover|furthermore|in addition|for example|on the other hand)/i.test(
          text
        );
      score += hasFlow ? 2 : 0;
      checks.push({ label: "Flow in Sentences", passed: hasFlow });
    } else if (section === "body") {
      const topicSentence = /^(\w+\s){4,8}/.test(sentences[0]);
      score += topicSentence ? 1 : 0;
      checks.push({ label: "Topic Sentence", passed: topicSentence });

      const hasExample = /(for example|for instance|such as|including)/i.test(
        text
      );
      score += hasExample ? 2 : 0;
      checks.push({ label: "Supporting Evidence/Example", passed: hasExample });

      const hasAnalysis =
        /(this means|this shows|this implies|this demonstrates|therefore)/i.test(
          text
        );
      score += hasAnalysis ? 2 : 0;
      checks.push({ label: "Explanation / Analysis", passed: hasAnalysis });

      const hasTransition =
        /(next|in addition|furthermore|moreover|on the other hand)/i.test(text);
      score += hasTransition ? 1 : 0;
      checks.push({ label: "Transition Sentence", passed: hasTransition });

      const grammarCorrect = await grammarCheck(text);
      score += grammarCorrect ? 2 : 0;
      checks.push({ label: "Grammar & Coherence", passed: grammarCorrect });

      const hasConclusion =
        /(in conclusion|to sum up|ultimately|overall)/i.test(text);
      score += hasConclusion ? 2 : 0;
      checks.push({ label: "Concluding Sentence", passed: hasConclusion });
    } else if (section === "conclusion") {
      const firstSentence = sentences[0];
      const sentenceCount = sentences.length;

      const hasThesisFirst =
        /(should|must|need to|important|cause|because|therefore|thus|in conclusion|i believe|we should)/i.test(
          firstSentence
        );
      score += hasThesisFirst ? 2 : 0;
      checks.push({
        label: "Thesis in First Sentence",
        passed: hasThesisFirst,
      });

      const grammarCorrect = await grammarCheck(text);
      score += grammarCorrect ? 2 : 0;
      checks.push({ label: "Correct Grammar", passed: grammarCorrect });

      const hasHopeful =
        /(in conclusion|we hope|in future|we believe|it is expected|should continue)/i.test(
          text
        );
      score += hasHopeful ? 2 : 0;
      checks.push({ label: "Hopeful/Concluding Remarks", passed: hasHopeful });

      const validLength = sentenceCount >= 10 && sentenceCount <= 12;
      score += validLength ? 2 : 0;
      checks.push({ label: "10–12 Sentences", passed: validLength });

      const hasCoherence =
        /(however|moreover|furthermore|in addition|for example|on the other hand|finally|lastly)/i.test(
          text
        );
      score += hasCoherence ? 2 : 0;
      checks.push({ label: "Flow / Coherence", passed: hasCoherence });
    }

    setMarks(score);
    setFeedback(checks);
  };

  const grammarCheck = async (paragraph) => {
    try {
      const res = await fetch("https://api.languagetoolplus.com/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text: paragraph, language: "en-US" }),
      });
      const result = await res.json();
      return result.matches.length < 3;
    } catch (err) {
      console.error("Grammar check failed", err);
      return false;
    }
  };

  const handleReset = () => {
    setText("");
    setMarks(null);
    setFeedback([]);
    setSection("");
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        📝Please Choose Paragraph Type:
      </h1>

      <select
        value={section}
        onChange={(e) => setSection(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded mb-4"
      >
        <option value="">Select Section</option>
        <option value="introduction">Introduction</option>
        <option value="body">Body Paragraph</option>
        <option value="conclusion">Conclusion</option>
      </select>

      {section && (
        <>
          <textarea
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Write your ${section} paragraph here...`}
            className="w-full border p-4 rounded mb-4"
          />

          <div className="flex gap-3 mb-6">
            {/* <button
              onClick={evaluateText}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Evaluate
            </button> */}
            <button
              onClick={async () => {
                setLoading(true);
                await evaluateText();
                setLoading(false);
              }}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  />
                </svg>
              )}
              {loading ? "Evaluating..." : "Evaluate"}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </>
      )}

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
            Total Marks: <span className="font-bold">{marks}/10</span> —{" "}
            {section === "conclusion" ? (
              marks >= 8 ? (
                <span className="text-green-600">Passed ✅</span>
              ) : (
                <span className="text-red-600">Failed ❌</span>
              )
            ) : marks >= 4 ? (
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

