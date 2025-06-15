"use client";

import { useState, useEffect, useRef } from "react";

export default function Yes() {
  const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
    "/10.jpg",
    "/11.jpg",
    "/12.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState<
    { id: number; left: number; duration: number }[]
  >([]);
  const [showNote, setShowNote] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          duration: 3 + Math.random() * 2,
        },
      ]);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    audioRef.current?.play();
  }, []);

  const handleNextImage = () => {
    setShowNote(false);
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setIsFading(false);
    }, 400);
  };

  const handleShowNote = () => {
    setShowNote(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-pink-400 overflow-hidden p-4">
      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-3xl text-pink-500"
            style={{
              left: `${heart.left}vw`,
              animation: `float ${heart.duration}s linear forwards`,
              top: "100vh",
              textShadow: "0 0 10px #ff69b4, 0 0 20px #ff69b4",
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Title */}
      <h1 className="z-10 text-3xl md:text-4xl font-bold text-white mb-8 drop-shadow-lg">
        ❤️ Moe Mitzu Aung ❤️
      </h1>

      {/* Content */}
      <div className="z-10 bg-white p-6 rounded-3xl shadow-xl border-8 border-pink-300 w-80 h-80 flex items-center justify-center text-center transition-transform duration-500 ease-in-out">
        {showNote ? (
          <p className="text-lg md:text-xl text-pink-500 font-semibold animate-fade-in">
            I know I may have made some mistakes before,
            <br />
            but I promise to become a better person for you.
            <br />I want to spend my life with you.
          </p>
        ) : (
          <img
            src={images[currentIndex]}
            alt="Couple"
            className={`w-full h-full object-cover rounded-2xl transition-opacity duration-500 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          />
        )}
      </div>

      {/* Buttons */}
      <div className="z-10 mt-8 flex gap-4">
        <button
          onClick={handleNextImage}
          className="px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition"
        >
          Next Picture 💞
        </button>

        <button
          onClick={handleShowNote}
          className="px-6 py-3 bg-yellow-400 text-white rounded-full shadow-lg hover:bg-yellow-500 transition"
        >
          Note 💌
        </button>
      </div>

      {/* เพลงเบา ๆ */}
      <audio ref={audioRef} loop src="/song.mp3" />

      {/* Floating hearts animation + fade-in animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease;
        }
      `}</style>
    </div>
  );
}
