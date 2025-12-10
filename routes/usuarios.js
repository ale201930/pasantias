const express = require("express");
const router = express.Router();
const Usuario = require("../models/user");

// Crear usuario
router.post("/crear", async (req, res) => {
    try {
        const datos = req.body;
        await Usuario.create(datos);
        res.json({ ok: true });
    } catch (error) {
        console.error(error);
        res.json({ ok: false, error: error.message });
    }
});

// Obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json({ ok: true, usuarios });
    } catch (error) {
        res.json({ ok: false, error: error.message });
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

