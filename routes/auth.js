const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

// Registrar usuario
router.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Verificar si ya existe un admin
        const adminExists = await User.findOne({ where: { role: "admin" } });

        // Si NO existe admin → el primer usuario SIEMPRE será admin
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newAdmin = await User.create({
                username,
                password: hashedPassword,
                role: "admin"
            });

            return res.json({ message: "Administrador creado correctamente", user: newAdmin });
        }

        // Si ya existe admin → SOLO un admin puede crear usuarios
        if (req.headers["x-role"] !== "admin") {
            return res.status(403).json({ error: "Solo el administrador puede crear usuarios" });
        }

        // Crear otros usuarios pero asegurar que NO creen otro admin
        if (role === "admin") {
            return res.status(403).json({ error: "Solo puede existir un administrador" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword,
            role
        });

        res.json({ message: "Usuario registrado correctamente", user: newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;
