const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");

const sequelize = require("./config/database");
const User = require("./models/user");

// 🔹 SINCRONIZAR BD Y CREAR ADMIN POR DEFECTO
sequelize.sync().then(async () => {
    const existeAdmin = await User.findOne({ where: { usuario: "admin" } });

    if (!existeAdmin) {
        await User.create({
            usuario: "admin",
            password: "admin123",  // El modelo la encripta automáticamente
            rol: "admin"
        });

        console.log("Usuario admin creado por defecto");
    }

    console.log("BD sincronizada");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
const inventarioRoutes = require("./routes/inventario");
app.use("/api/inventario", inventarioRoutes);

const usuarioRoutes = require("./routes/user");   // Debe existir /routes/user.js
app.use("/api/user", usuarioRoutes);

// Página principal -> Login
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 🔹 RUTA DE LOGIN REAL
app.post("/login", async (req, res) => {
    const { usuario, password } = req.body;

    try {
        const user = await User.findOne({ where: { usuario } });

        if (!user) {
            return res.json({ ok: false, mensaje: "Usuario no encontrado" });
        }

        const passwordCorrecta = await bcrypt.compare(password, user.password);
        if (!passwordCorrecta) {
            return res.json({ ok: false, mensaje: "Contraseña incorrecta" });
        }

        // DEVOLVER EL ROL
        return res.json({ ok: true, rol: user.rol });

    } catch (err) {
        console.error("ERROR LOGIN:", err);
        return res.json({ ok: false, mensaje: "Error interno del servidor" });
    }
});

// Servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});





