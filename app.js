const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors"); // Por si frontend y backend no corren en el mismo origen

const sequelize = require("./config/database");
const User = require("./models/user");

const app = express();

// 🔹 MIDDLEWARES
app.use(cors()); // Permite peticiones desde otros orígenes si se necesita
app.use(express.json()); // Para recibir JSON
app.use(express.urlencoded({ extended: true })); // Para recibir formularios
app.use(express.static(path.join(__dirname, "public"))); // Archivos estáticos

// 🔹 RUTAS API
const inventarioRoutes = require("./routes/inventario");
app.use("/api/inventario", inventarioRoutes);

const usuarioRoutes = require("./routes/user"); // Asegúrate que exista
app.use("/api/user", usuarioRoutes);

// 🔹 PAGINA PRINCIPAL -> LOGIN
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 🔹 RUTA DE LOGIN
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

// 🔹 SINCRONIZAR BD Y CREAR ADMIN POR DEFECTO
sequelize.sync().then(async () => {
    console.log("Base de datos sincronizada");

    const existeAdmin = await User.findOne({ where: { usuario: "admin" } });
    if (!existeAdmin) {
        await User.create({
            usuario: "admin",
            password: "admin123", // Se encripta automáticamente en el modelo
            rol: "admin"
        });
        console.log("Usuario admin creado por defecto");
    }
});

// 🔹 SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});





