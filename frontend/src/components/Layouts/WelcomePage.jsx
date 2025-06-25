import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const sentences = [
  "Your money, your rules — organized.",
  "Sync your spend. Shape your future.",
  "Effortless money tracking, real results.",
  "Stop guessing. Start tracking.",
  "Make every rupee count.",
];

const WelcomePage = () => {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const typingSpeed = 90;
    const deletingSpeed = 30;
    const pauseDuration = 1500;

    let timeout;

    const type = () => {
      const currentSentence = sentences[index];
      if (isDeleting) {
        setText(currentSentence.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % sentences.length);
        }
      } else {
        setText(currentSentence.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex === currentSentence.length) {
          setIsDeleting(true);
          timeout = setTimeout(type, pauseDuration);
          return;
        }
      }
      timeout = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    };

    timeout = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [index, charIndex, isDeleting]);

  return (
    <div className="flex items-center justify-center min-h-screen text-[#317bdd] font-[Poppins] overflow-x-hidden relative bg-gradient-to-br from-[#a1ebfb] via-[#ffcccb] to-[#ffeb99] animate-gradient">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="./horizontal.png"
            alt="FinSync Logo"
            className="w-[150px] h-auto mx-auto"
          />
        </div>

        {/* Animated Text */}
        <div className="mb-10 h-[4.5rem] flex items-center justify-center">
          <h1 className="text-[3.5rem] font-bold whitespace-nowrap overflow-hidden border-r-2 border-[#317bdd] animate-caret">
            {text}
          </h1>
        </div>

        {/* Get Started Button */}
        <Link
          to="/login"
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </Link>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 w-full text-center text-[#317bdd] text-sm">
        © 2025 FinSync. All rights reserved.
      </footer>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        @keyframes blink-caret {
          from, to { border-color: transparent; }
          50% { border-color: #317bdd; }
        }
        .animate-caret {
          animation: blink-caret 0.75s step-end infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
