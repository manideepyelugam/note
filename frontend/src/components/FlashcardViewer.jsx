import { useState } from "react";
import { X } from "lucide-react";

const FlashcardViewer = ({ flashcards, onClose }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  if (flashcards.length === 0) return null;

  const current = flashcards[index];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1e1e1e] text-white rounded-2xl shadow-2xl w-[400px] h-[300px] flex flex-col p-5 transition-all relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Flashcard {index + 1} / {flashcards.length}
          </h2>
          <button onClick={onClose} className="hover:text-red-400 transition">
            <X />
          </button>
        </div>

        {/* Flashcard body */}
        <div
          onClick={() => setFlipped(!flipped)}
          className="flex-1 cursor-pointer bg-[#2c2c2c] flex items-center justify-center text-center text-lg rounded-xl p-4 transition-all hover:scale-105"
        >
          {flipped ? (
            <span className="text-green-400 font-medium">{current.answer}</span>
          ) : (
            <span className="font-medium">{current.question}</span>
          )}
        </div>

        {/* Controls */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => {
              setIndex((prev) => Math.max(0, prev - 1));
              setFlipped(false);
            }}
            disabled={index === 0}
            className="px-4 py-1 bg-blue-600 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => {
              setIndex((prev) => Math.min(flashcards.length - 1, prev + 1));
              setFlipped(false);
            }}
            disabled={index === flashcards.length - 1}
            className="px-4 py-1 bg-blue-600 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardViewer;
