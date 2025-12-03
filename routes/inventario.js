const express = require("express");
const router = express.Router();
const Inventario = require("../models/Inventario");
const { Op } = require("sequelize"); // IMPORTANTE

//------------------------------------------
// REGISTRAR UN ARTÍCULO
//------------------------------------------
router.post("/registrar", async (req, res) => {
    try {
        const { localidad, tipo_articulo } = req.body;

        // Validación obligatoria
        if (!localidad || !tipo_articulo) {
            return res.json({
                ok: false,
                error: "Debe llenar al menos Localidad y Tipo de artículo."
            });
        }

        const nuevoEquipo = await Inventario.create(req.body);

        res.json({
            ok: true,
            mensaje: "Equipo registrado exitosamente.",
            data: nuevoEquipo
        });

    } catch (error) {
        console.error("Error al registrar:", error);
        res.status(500).json({
            ok: false,
            error: "Error al registrar equipo."
        });
    }
});

//------------------------------------------
// LISTAR INVENTARIO COMPLETO
//------------------------------------------
router.get("/listar", async (req, res) => {
    try {
        const datos = await Inventario.findAll({
            order: [["id", "DESC"]]
        });

        res.json({
            ok: true,
            data: datos
        });

    } catch (error) {
        console.error("Error al listar:", error);
        res.status(500).json({
            ok: false,
            error: "Error al obtener inventario."
        });
    }
});

//------------------------------------------
// BUSCADOR / FILTROS
//------------------------------------------
router.get("/buscar", async (req, res) => {
    const { query } = req.query;

    try {
        const resultados = await Inventario.findAll({
            where: {
                [Op.or]: [
                    { serial: { [Op.like]: `%${query}%` } },
                    { marca: { [Op.like]: `%${query}%` } },
                    { modelo: { [Op.like]: `%${query}%` } },
                    { ip: { [Op.like]: `%${query}%` } },
                    { nombre_equipo: { [Op.like]: `%${query}%` } },
                    { usuario_responsable: { [Op.like]: `%${query}%` } }
                ]
            }
        });

        res.json({
            ok: true,
            data: resultados
        });

    } catch (error) {
        console.error("Error en buscador:", error);
        res.status(500).json({
            ok: false,
            error: "Error en buscador."
        });
    }
});

//------------------------------------------
// EDITAR REGISTRO
//------------------------------------------
router.put("/editar/:id", async (req, res) => {
    try {
        await Inventario.update(req.body, {
            where: { id: req.params.id }
        });

        res.json({
            ok: true,
            mensaje: "Registro actualizado."
        });

    } catch (error) {
        console.error("Error al editar:", error);
        res.status(500).json({
            ok: false,
            error: "Error al editar inventario."
        });
    }
});

//------------------------------------------
// ELIMINAR REGISTRO
//------------------------------------------
router.delete("/eliminar/:id", async (req, res) => {
    try {
        await Inventario.destroy({
            where: { id: req.params.id }
        });

        res.json({
            ok: true,
            mensaje: "Equipo eliminado."
        });

    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({
            ok: false,
            error: "Error al eliminar."
        });
    }
});

module.exports = router;

