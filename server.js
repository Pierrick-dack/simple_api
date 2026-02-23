const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(express.json());

// Création du pool de connexion MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Test connexion
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erreur connexion MySQL :", err);
  } else {
    console.log("Connecté à MySQL !");
    connection.release();
  }
});

// ROUTES CRUD

// 📌 Récupérer tous les clients
app.get("/clients", (req, res) => {
  pool.query("SELECT * FROM clients", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 📌 Récupérer un client par ID
app.get("/clients/:id", (req, res) => {
  pool.query("SELECT * FROM clients WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// 📌 Ajouter un client
app.post("/clients", (req, res) => {
  const { nom, email } = req.body;
  pool.query(
    "INSERT INTO clients (nom, email) VALUES (?, ?)",
    [nom, email],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Client ajouté", id: result.insertId });
    }
  );
});

// 📌 Modifier un client
app.put("/clients/:id", (req, res) => {
  const { nom, email } = req.body;
  pool.query(
    "UPDATE clients SET nom = ?, email = ? WHERE id = ?",
    [nom, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Client modifié" });
    }
  );
});

// 📌 Supprimer un client
app.delete("/clients/:id", (req, res) => {
  pool.query("DELETE FROM clients WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Client supprimé" });
  });
});

app.get("/to_uppercase/:text", (req, res) => {
  const text = req.params.text;
  const uppercased = toUpperCase(text);
  res.json({ original: text, uppercased });
});


app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});

function toUpperCase(text) {
  return text.toUpperCase();
}