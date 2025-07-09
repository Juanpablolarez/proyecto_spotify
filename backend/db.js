const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "songs.db"));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS songs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      artist TEXT,
      album TEXT,
      audioUrl TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS likes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      songId INTEGER,
      FOREIGN KEY(songId) REFERENCES songs(id)
    )
  `);

  // Insertar canciones si la tabla está vacía
  db.all("SELECT * FROM songs", (err, rows) => {
    if (rows.length === 0) {
      const insert = db.prepare(
        "INSERT INTO songs (title, artist, album, audioUrl) VALUES (?, ?, ?, ?)"
      );
      insert.run("Lo-Fi Sunset", "Dreamwave", "Late Chill", "/audio/lofi1.mp3");
      insert.run("Night Drive", "RetroRoads", "Drive Tape", "/audio/drive.mp3");
      insert.finalize();
    }
  });
});

module.exports = db;
