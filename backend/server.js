const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


app.use('/music', express.static(path.join(__dirname, 'music')));


app.get('/api/music', (req, res) => {
    const musicPath = path.join(__dirname, 'music');
    
    fs.readdir(musicPath, (err, files) => {
        if (err) {
            console.error('Error al leer archivos:', err);
            return res.status(500).json({ error: 'Error del servidor' });
        }
        
        const musicFiles = files.filter(file => 
            file.endsWith('.mp3') || 
            file.endsWith('.wav') ||
            file.endsWith('.ogg')
        );
        
        const musicList = musicFiles.map(file => ({
            id: file,
            title: file.replace(/\.[^/.]+$/, ""), 
            url: `/music/${encodeURIComponent(file)}`
        }));
        
        res.json(musicList);
    });
});

