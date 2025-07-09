const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/api", apiRoutes);

// Servir archivos de audio
app.use("/audio", express.static(path.join(__dirname, "audio")));

app.listen(PORT, () => {
  console.log(`🎧 Servidor corriendo en http://localhost:${PORT}`);
});
