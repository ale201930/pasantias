const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Crear usuario
router.post("/crear", async (req, res) => {
    try {
        const { nombre, usuario, password, rol } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const nuevo = await User.create({
            nombre,
            usuario,
            password: hashed,
            rol,
            activo: 1,
        });

        res.json({ ok: true, mensaje: "Usuario creado", usuario: nuevo });
    } catch (error) {
        res.status(500).json({ ok: false, error: "Error al crear usuario" });
    }
});

// Listar usuarios
router.get("/listar", async (req, res) => {
    const usuarios = await User.findAll({ order: [["id", "DESC"]] });
    res.json(usuarios);
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

module.exports = router;

