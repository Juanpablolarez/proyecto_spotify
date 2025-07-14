// frontend/src/services/musicService.js

/**
 * Obtiene la lista de canciones desde el backend
 * @returns {Promise<Array>} Lista de canciones
 */
export const getMusicList = async () => {
  try {
    const response = await fetch('/api/music');
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Error fetching music list:', error);
    // Puedes mostrar una notificación al usuario aquí
    return [];
  }
};

/**
 * Busca una canción por su ID (opcional, para futuras implementaciones)
 * @param {string} id - ID de la canción
 * @returns {Promise<Object|null>} Objeto de la canción o null
 */
export const getSongById = async (id) => {
  try {
    const response = await fetch(`/api/music/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error(`Error fetching song ${id}:`, error);
    return null;
  }
};