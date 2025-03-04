const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");

const app = express();
dotenv.config();
app.use(express.json()); // Permite recibir JSON en las solicitudes

const port = process.env.PORT || 3000;

// Importar rutas
const votersRoutes = require("./routes/voters");
const candidatesRoutes = require("./routes/candidates");
const votesRoutes = require("./routes/votes");

app.use("/voters", votersRoutes);
app.use("/candidates", candidatesRoutes);
app.use("/votes", votesRoutes);

app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando correctamente");
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});