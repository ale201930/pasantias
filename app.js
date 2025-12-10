const express = require("express");
const app = express();
const path = require("path");

// BD
const sequelize = require("./config/database");

// Modelos (importan las tablas y las registra Sequelize)
require("./models/inventario");
require("./models/user");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
const inventarioRoutes = require("./routes/inventario");
app.use("/api/inventario", inventarioRoutes);

const usuarioRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuarioRoutes);

// Página inicial
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Sincronizar tablas
sequelize.sync()
    .then(() => console.log("Base de datos sincronizada: Inventario + Usuarios"))
    .catch(err => console.error(err));

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});






