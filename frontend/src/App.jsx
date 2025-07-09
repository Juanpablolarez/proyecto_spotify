import React, { useState, useRef } from "react";
import { Play, Pause, Heart, SkipForward, SkipBack } from "lucide-react";
import "./App.css";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 h-screen bg-zinc-900 p-6 hidden md:block">
          <div className="text-green-500 text-2xl font-bold mb-6">Spotify Clone</div>
          <nav className="flex flex-col gap-4">
            <a href="#" className="text-zinc-200 hover:text-white">Home</a>
            <a href="#" className="text-zinc-200 hover:text-white">Search</a>
            <a href="#" className="text-zinc-200 hover:text-white">Your Library</a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h1 className="text-3xl font-bold mb-4">Now Playing</h1>
          <div className="bg-zinc-800 p-6 rounded-2xl shadow-lg max-w-xl mx-auto">
            <div className="flex items-center gap-6">
              <img
                src="https://i.scdn.co/image/ab67616d00001e028d8f97d5242f2f58a9205199"
                alt="Album Cover"
                className="w-24 h-24 rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Track Title</h2>
                <p className="text-sm text-zinc-400">Artist Name</p>
              </div>
              <button
                className="text-green-500 hover:text-green-400 transition"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              <audio ref={audioRef} src="/sample.mp3" />
            </div>

            <div className="mt-4 flex justify-center gap-6">
              <button className="text-zinc-300 hover:text-white">
                <SkipBack size={20} />
              </button>
              <button
                className="text-zinc-300 hover:text-white"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              <button className="text-zinc-300 hover:text-white">
                <SkipForward size={20} />
              </button>
              <button className="text-pink-500 hover:text-pink-400">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
