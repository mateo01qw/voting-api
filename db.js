const mysql = require("mysql2");

// Configurar conexión con la base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",  // ⚠️ Cambia si usaste otro usuario
  password: "1234m",  // ⚠️ Cambia si tienes otra contraseña
  database: "voting_db"
});

// Conectar a MySQL
db.connect(err => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});

// Exportar la conexión para usarla en otros archivos
module.exports = db;

