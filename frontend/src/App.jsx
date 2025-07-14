import React from 'react';
import Player from './components/Player';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      {/* Contenedor del logo */}
      <div className="mb-6 flex flex-col items-center">
        {/* Aquí va tu logo */}
        <img 
          src="/images/mi-logo.png"  // Ruta a tu logo
          alt="Logo de Mi Reproductor" 
          className="h-24 w-auto mb-2" // Tamaño del logo
        />
        {/* Título debajo del logo */}
        <h1 className="text-2xl font-bold text-green-500">
          Mi Reproductor Spotify
        </h1>
      </div>
      
      {/* Contenedor del reproductor */}
      <div className="w-full max-w-md">
        <Player />
      </div>
      
      {/* Pie de página */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        Proyecto Spotify © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;