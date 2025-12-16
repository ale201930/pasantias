const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_KEY } = require("../middlewares/authMiddleware"); // Creamos authMiddleware.js

// POST /login
router.post("/", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscar usuario en la base de datos
        const user = await User.findOne({ where: { usuario } });
        if (!user) {
            return res.status(400).json({ ok: false, error: "Usuario no encontrado" });
        }

        // Comparar contraseña con bcrypt
        const valido = await bcrypt.compare(password, user.password);
        if (!valido) {
            return res.status(400).json({ ok: false, error: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, usuario: user.usuario, rol: user.rol },
            SECRET_KEY,
            { expiresIn: "8h" }
        );

        // Devolver información
        res.json({
            ok: true,
            user: {
                id: user.id,
                usuario: user.usuario,
                rol: user.rol
            },
            token
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: "Error en el servidor" });
    }
});

module.exports = router;







