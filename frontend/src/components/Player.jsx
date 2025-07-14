// frontend/src/components/Player.jsx
import React, { useState, useEffect, useRef } from 'react';
import { getMusicList } from '../services/musicService';

const Player = () => {
  // Estados
  const [musicList, setMusicList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  // Referencia al elemento de audio
  const audioRef = useRef(null);

  // Cargar lista de canciones al iniciar
  useEffect(() => {
    const loadMusic = async () => {
      try {
        const tracks = await getMusicList();
        setMusicList(tracks);
        if (tracks.length > 0) {
          setCurrentTrack(tracks[0].url);
        }
      } catch (error) {
        console.error('Error cargando música:', error);
      }
    };
    
    loadMusic();
  }, []);

  // Controlar reproducción/pausa
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Cambiar canción
  const handleSongSelect = (url) => {
    setCurrentTrack(url);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 0);
  };

  // Actualizar tiempo de reproducción
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Formatear tiempo (mm:ss)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-xl max-w-md mx-auto shadow-2xl">
      {/* Reproductor de audio (oculto) */}
      <audio
        ref={audioRef}
        src={currentTrack}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      
      {/* Controles principales */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold truncate max-w-xs">
            {musicList.find(song => song.url === currentTrack)?.title || 'Selecciona una canción'}
          </h2>
          <p className="text-gray-400 text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
        
        <button 
          onClick={togglePlay}
          className="bg-green-500 hover:bg-green-600 rounded-full p-3 w-14 h-14 flex items-center justify-center"
        >
          {isPlaying ? (
            <span className="text-2xl">⏸</span>
          ) : (
            <span className="text-2xl ml-1">▶</span>
          )}
        </button>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-6">
        <input 
          type="range"
          min="0"
          max={duration || 100}
          value={currentTime}
          onChange={(e) => {
            if (audioRef.current) {
              audioRef.current.currentTime = e.target.value;
            }
          }}
          className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      
      {/* Lista de canciones */}
      <div className="bg-gray-800 rounded-lg p-3 max-h-60 overflow-y-auto">
        <h3 className="font-semibold text-lg mb-2 sticky top-0 bg-gray-800 py-1">
          Canciones ({musicList.length})
        </h3>
        
        <ul className="space-y-2">
          {musicList.map((song) => (
            <li 
              key={song.id}
              className={`flex items-center p-2 rounded cursor-pointer hover:bg-gray-700 transition ${
                currentTrack === song.url ? 'bg-gray-700' : ''
              }`}
              onClick={() => handleSongSelect(song.url)}
            >
              <span className="mr-3">
                {currentTrack === song.url && isPlaying ? '🔊' : '🎵'}
              </span>
              <span className="truncate flex-1">{song.title}</span>
              <span className="text-xs text-gray-400">3:45</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Player;