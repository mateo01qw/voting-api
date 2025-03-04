const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Nombre y email son obligatorios" });

  db.query("INSERT INTO voters (name, email, has_voted) VALUES (?, ?, false)", 
    [name, email], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Votante agregado", id: result.insertId });
    });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM voters", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  db.query("SELECT * FROM voters WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Votante no encontrado" });
    res.json(result[0]);
  });
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM voters WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Votante eliminado" });
  });
});

module.exports = router;
