const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Crear usuario
router.post("/crear", async (req, res) => {
    try {
        const datos = req.body;
        await User.create(datos); // El modelo encripta la contraseña automáticamente
        res.json({ ok: true });
    } catch (error) {
        console.error(error);
        res.json({ ok: false, error: error.message });
    }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await User.findAll();
        res.json({ ok: true, usuarios });
    } catch (error) {
        res.json({ ok: false, error: error.message });
    }
});

// Listar con orden
router.get("/listar", async (req, res) => {
    try {
        const usuarios = await User.findAll({ order: [["id", "DESC"]] });
        res.json({ ok: true, usuarios });
    } catch (error) {
        res.json({ ok: false, error: error.message });
    }
});

// Editar usuario
router.put("/editar/:id", async (req, res) => {
    try {
        await User.update(req.body, { where: { id: req.params.id } });
        res.json({ ok: true, mensaje: "Usuario actualizado" });
    } catch (error) {
        res.status(500).json({ error: "Error al editar usuario" });
    }
});

// Activar / desactivar
router.put("/estatus/:id", async (req, res) => {
    try {
        const { activo } = req.body;
        await User.update({ activo }, { where: { id: req.params.id } });
        res.json({ ok: true, mensaje: "Estatus actualizado" });
    } catch (error) {
        res.status(500).json({ error: "Error al cambiar estatus" });
    }
});

// Eliminar usuario
router.delete("/eliminar/:id", async (req, res) => {
    try {
        await User.destroy({ where: { id: req.params.id } });
        res.json({ ok: true, mensaje: "Usuario eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
});

const bcrypt = require("bcrypt");

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { usuario, password } = req.body;

        // Buscar usuario por nombre
        const user = await User.findOne({ where: { usuario } });

        if (!user) {
            return res.json({ ok: false, mensaje: "Usuario no existe" });
        }

        // Comparar contraseñas (texto vs hash)
        const passwordCorrecta = await bcrypt.compare(password, user.password);

        if (!passwordCorrecta) {
            return res.json({ ok: false, mensaje: "Contraseña incorrecta" });
        }

        // Verificar estatus
        if (!user.activo) {
            return res.json({ ok: false, mensaje: "Usuario deshabilitado" });
        }

        return res.json({
            ok: true,
            mensaje: "Login exitoso",
            rol: user.rol
        });

    } catch (error) {
        console.error(error);
        res.json({ ok: false, mensaje: "Error interno en login" });
    }
});


module.exports = router;


