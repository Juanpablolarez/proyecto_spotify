// frontend/src/App.jsx
import React from 'react';
import Player from './components/Player';
import './App.css'; // (Opcional) Si tienes un archivo CSS específico

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-green-500">
          Mi Reproductor de Spotify
        </h1>
        <Player />
        <footer className="mt-8 text-center text-gray-500 text-sm">
          Proyecto Spotify © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

export default App;