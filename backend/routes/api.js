const express = require("express");
const db = require("../db");
const router = express.Router();

// Obtener todas las canciones
router.get("/songs", (req, res) => {
  db.all("SELECT * FROM songs", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Obtener canciones con likes
router.get("/likes", (req, res) => {
  db.all("SELECT songId FROM likes", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const likedIds = rows.map(row => row.songId);
    res.json(likedIds);
  });
});

// Alternar like
router.post("/like/:id", (req, res) => {
  const songId = parseInt(req.params.id);

  db.get("SELECT * FROM likes WHERE songId = ?", [songId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (row) {
      db.run("DELETE FROM likes WHERE songId = ?", [songId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ liked: false });
      });
    } else {
      db.run("INSERT INTO likes (songId) VALUES (?)", [songId], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ liked: true });
      });
    }
  });
});

module.exports = router;
