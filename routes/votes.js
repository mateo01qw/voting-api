const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", (req, res) => {
  const { voter_id, candidate_id } = req.body;
  
  if (!voter_id || !candidate_id) return res.status(400).json({ error: "IDs requeridos" });

  db.query("SELECT has_voted FROM voters WHERE id = ?", [voter_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Votante no encontrado" });
    if (result[0].has_voted) return res.status(400).json({ error: "Ya votaste" });

    db.query("INSERT INTO votes (voter_id, candidate_id) VALUES (?, ?)", [voter_id, candidate_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query("UPDATE voters SET has_voted = 1 WHERE id = ?", [voter_id]);
      db.query("UPDATE candidates SET votes = votes + 1 WHERE id = ?", [candidate_id]);

      res.status(201).json({ message: "Voto registrado" });
    });
  });
});

router.get("/statistics", (req, res) => {
  const statsQuery = `
    SELECT c.name, c.votes, 
      (c.votes * 100 / (SELECT COUNT(*) FROM votes)) AS percentage 
    FROM candidates c ORDER BY c.votes DESC`;
  
  db.query(statsQuery, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

module.exports = router;
