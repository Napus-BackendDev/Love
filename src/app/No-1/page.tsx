"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Heart {
  id: number;
  left: number;
  duration: number;
}

export default function NoNumberone() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  // พยายามเล่นเพลงทันทีเมื่อโหลด
  useEffect(() => {
    const playPromise = audioRef.current?.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleYes = () => {
    router.push("/Yes");
  };

  const handleNo = () => {
    router.push("/No-2");
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center overflow-hidden p-4">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-3xl text-pink-500"
            style={{
              left: `${heart.left}vw`,
              animation: `float ${heart.duration}s linear forwards`,
              top: "100vh",
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="z-10 bg-white p-6 md:p-10 rounded-2xl shadow-xl text-center w-full max-w-md relative">
        {/* Toggle Music Button */}
        <button
          onClick={toggleMusic}
          className="absolute top-2 right-2 bg-pink-200 p-2 rounded-full shadow text-pink-500 hover:bg-pink-300 transition text-sm"
        >
          {isPlaying ? "Pause 🎵" : "Play 🎶"}
        </button>

        {/* Valentine GIF */}
        <div className="flex justify-center mb-4">
          <img
            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzlld3V3bXBncGNyMGIycXhyemFpMmpkbmN5eGVoeXJmZThxNW8xMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K6WIhJ07gwGkIAQfwN/giphy.gif"
            alt="Valentine Character"
            className="w-32 h-32 md:w-48 md:h-48 object-contain rounded-xl"
          />
        </div>

        <h1 className="text-xl md:text-3xl font-bold text-pink-500 mb-2">
          Will You Be Mine? 💞
        </h1>
        <p className="text-base md:text-lg mb-6">It can't be real 😣</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleYes}
            className="px-4 py-2 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition"
          >
            YES 💖
          </button>
          <button
            onClick={handleNo}
            className="px-4 py-2 bg-red-400 text-white rounded-full shadow hover:bg-red-500 transition"
          >
            NO 😢
          </button>
        </div>
      </div>

      <audio ref={audioRef} loop src="/oo.mp3" />

      {/* Floating Hearts Animation */}
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
      `}</style>
    </div>
  );
}
