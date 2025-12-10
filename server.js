const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Para recibir JSON
app.use(bodyParser.json());

// Servir archivos estáticos (tu HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Login
app.post("/login", (req, res) => {
    const { usuario, password } = req.body;

    // Usuarios de ejemplo
    const usuarios = [
        { usuario: "admin", password: "123456", rol: "administrador" },
        { usuario: "coord", password: "coord123", rol: "coordinador" },
        { usuario: "gerente", password: "gerente123", rol: "gerente" }
    ];

    const user = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (!user) {
        return res.json({ ok: false, mensaje: "Usuario o contraseña incorrectos" });
    }

    // Login correcto
    res.json({ ok: true, rol: user.rol, mensaje: "Login exitoso" });
});

// 🔹 Redirección a panel según rol (opcional)
app.get("/admin.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/admin.html"));
});
app.get("/coordinador.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/coordinador.html"));
});
app.get("/gerente.html", (req, res) => {
    res.sendFile(path.join(__dirname, "public/gerente.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
