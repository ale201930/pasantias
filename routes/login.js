const express = require("express");
const router = express.Router();
require("dotenv").config();

const USERS = {
    administrador: process.env.ADMIN_PASS,
    coordinador: process.env.COORD_PASS,
    gerente: process.env.GERENTE_PASS
};

router.post("/", (req, res) => {
    const { usuario, password } = req.body;

    if (!USERS[usuario]) {
        return res.json({ ok: false, mensaje: "Usuario no encontrado" });
    }

    if (USERS[usuario] !== password) {
        return res.json({ ok: false, mensaje: "Contraseña incorrecta" });
    }

    return res.json({
        ok: true,
        rol: usuario
    });
});

module.exports = router;






