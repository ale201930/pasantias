const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { Usuario } = require("../db/models");

router.post("/", async (req, res) => {
    const { usuario, password } = req.body;

    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
        return res.json({ error: "Usuario no encontrado" });
    }

    if (!user.activo) {
        return res.json({ error: "Usuario inactivo" });
    }

    const coincide = await bcrypt.compare(password, user.password);

    if (!coincide) {
        return res.json({ error: "Contraseña incorrecta" });
    }

    // Retorna el rol para redirigir al módulo correcto
    res.json({
        ok: true,
        rol: user.rol,
        nombre: user.nombre
    });
});

module.exports = router;
