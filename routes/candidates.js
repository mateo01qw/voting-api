const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, party } = req.body;
  if (!name) return res.status(400).json({ error: "Nombre es obligatorio" });

  db.query("INSERT INTO candidates (name, party, votes) VALUES (?, ?, 0)", 
    [name, party || ""], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Candidato agregado", id: result.insertId });
    });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM candidates", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM candidates WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Candidato no encontrado" });
    res.json(result[0]);
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM candidates WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Candidato eliminado" });
  });
});

module.exports = router;
