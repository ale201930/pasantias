const express = require("express");
const bcrypt = require("bcryptjs"); // Cambiado a bcryptjs
const User = require("../models/user");
const router = express.Router();

// Roles permitidos
const ROLES_VALIDOS = ["admin", "coordinador", "gerente_ti"];

// Registrar usuario
router.post("/register", async (req, res) => {
    try {
        let { usuario, password, rol } = req.body;

        // Validaciones básicas
        if (!usuario || !password || !rol) {
            return res.status(400).json({ ok: false, error: "Todos los campos son obligatorios" });
        }

        if (!ROLES_VALIDOS.includes(rol)) {
            return res.status(400).json({ ok: false, error: "Rol no válido" });
        }

        // Verificar si ya existe un admin
        const adminExists = await User.findOne({ where: { rol: "admin" } });

        // Primer usuario → siempre admin
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = await User.create({
                usuario,
                password: hashedPassword,
                rol: "admin"
            });

            return res.json({ ok: true, user: newAdmin, mensaje: "Administrador creado correctamente" });
        }

        // Solo admin puede crear otros usuarios
        if (req.headers["x-role"] !== "admin") {
            return res.status(403).json({ ok: false, error: "Solo el administrador puede crear usuarios" });
        }

        // Evitar que se cree otro admin
        if (rol === "admin") {
            return res.status(403).json({ ok: false, error: "Solo puede existir un administrador" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ usuario, password: hashedPassword, rol });

        res.json({ ok: true, user: newUser, mensaje: "Usuario registrado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: "Error en el servidor" });
    }
});

module.exports = router;

