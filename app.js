const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const sequelize = require("./config/database");
const User = require("./models/user");
const Inventario = require("./models/inventario");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 🔹 MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 🔹 FUNCION PARA NOTIFICAR CAMBIOS
function notificarCambioInventario() {
    io.emit("actualizar-inventario");
}

// 🔹 RUTAS API
const inventarioRoutes = require("./routes/inventario")(io);
app.use("/api/inventario", inventarioRoutes);

const usuarioRoutes = require("./routes/user");
app.use("/api/user", usuarioRoutes);

// 🔹 PÁGINA PRINCIPAL -> LOGIN
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});

// 🔹 RUTA DE LOGIN
app.post("/api/login", async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const user = await User.findOne({ where: { usuario } });
        if (!user) return res.json({ ok: false, mensaje: "Usuario no encontrado" });

        const passwordCorrecta = await bcrypt.compare(password, user.password);
        if (!passwordCorrecta) return res.json({ ok: false, mensaje: "Contraseña incorrecta" });

        return res.json({
            ok: true,
            user: {
                id: user.id,
                usuario: user.usuario,
                rol: user.rol
            },
            token: "dummy-token"
        });
    } catch (err) {
        console.error("ERROR LOGIN:", err);
        return res.json({ ok: false, mensaje: "Error interno del servidor" });
    }
});

// 🔹 SINCRONIZAR BD Y CREAR ADMIN POR DEFECTO
async function iniciarServidor() {
    try {
        await sequelize.sync({ alter: true });
        console.log("Tablas sincronizadas.");

        const existeAdmin = await User.findOne({ where: { usuario: "admin" } });
        if (!existeAdmin) {
            await User.create({
                usuario: "admin",
                password: await bcrypt.hash("admin123", 10),
                rol: "admin"
            });
            console.log("Usuario admin creado por defecto");
        }

        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });

        io.on("connection", (socket) => {
            console.log("Cliente conectado:", socket.id);
            socket.on("disconnect", () => {
                console.log("Cliente desconectado:", socket.id);
            });
        });

    } catch (error) {
        console.error("Error al iniciar servidor:", error);
    }
}

iniciarServidor();

