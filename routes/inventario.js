const express = require("express");
const router = express.Router();
const Inventario = require("../models/inventario");
const { Op, fn, col, where } = require("sequelize");

// 🔹 REGISTRAR EQUIPO
router.post("/registrar", async (req, res) => {
    try {
        const datos = req.body;
        const requiredFields = ["localidad","tipo_articulo","marca","modelo","serial","status"];
        for (const field of requiredFields) {
            if (!datos[field]) return res.status(400).json({ ok: false, error: `${field} es obligatorio` });
        }
        await Inventario.create(datos);
        res.json({ ok: true });
    } catch (error) {
        console.error("POST /api/inventario/registrar", error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

// 🔹 OBTENER INVENTARIO CON FILTROS
router.get("/", async (req, res) => {
    try {
        const { buscar, tipo_articulo, localidad, marca, modelo, serial, usuario_responsable, status } = req.query;
        const filtros = {};
        if (tipo_articulo) filtros.tipo_articulo = tipo_articulo;
        if (localidad) filtros.localidad = localidad;
        if (marca) filtros.marca = marca;
        if (modelo) filtros.modelo = modelo;
        if (serial) filtros.serial = serial;
        if (usuario_responsable) filtros.usuario_responsable = usuario_responsable;
        if (status) filtros.status = status;

        if (buscar) {
            const b = `%${buscar.toLowerCase()}%`;
            filtros[Op.or] = [
                where(fn('lower', col('nombre_del_equipo')), { [Op.like]: b }),
                where(fn('lower', col('serial')), { [Op.like]: b }),
                where(fn('lower', col('usuario_responsable')), { [Op.like]: b }),
                where(fn('lower', col('marca')), { [Op.like]: b }),
                where(fn('lower', col('modelo')), { [Op.like]: b })
            ];
        }

        const equipos = await Inventario.findAll({ where: filtros, order: [["id", "DESC"]] });
        res.json({ ok: true, equipos });
    } catch (error) {
        console.error("GET /api/inventario", error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

// 🔹 OBTENER UN EQUIPO POR ID
router.get("/:id", async (req, res) => {
    try {
        const equipo = await Inventario.findByPk(req.params.id);
        if (!equipo) return res.status(404).json({ ok: false, error: "Equipo no encontrado" });
        res.json({ ok: true, equipo });
    } catch (error) {
        console.error(`GET /api/inventario/${req.params.id}`, error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

// 🔹 ACTUALIZAR UN EQUIPO
router.put("/:id", async (req, res) => {
    try {
        const equipo = await Inventario.findByPk(req.params.id);
        if (!equipo) return res.status(404).json({ ok: false, error: "Equipo no encontrado" });

        // Actualizar solo campos válidos
        const camposValidos = [
            "localidad","tipo_articulo","marca","modelo","serial","procesador",
            "ram","disco","version_windows","antivirus","nombre_del_equipo",
            "ubicacion","usuario_responsable","ip","bios","fecha_de_asignacion","status"
        ];

        const datosActualizar = {};
        camposValidos.forEach(c => {
            if (req.body[c] !== undefined) datosActualizar[c] = req.body[c];
        });

        await equipo.update(datosActualizar);
        res.json({ ok: true });
    } catch (error) {
        console.error(`PUT /api/inventario/${req.params.id}`, error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

// 🔹 ELIMINAR UN EQUIPO
router.delete("/:id", async (req, res) => {
    try {
        const equipo = await Inventario.findByPk(req.params.id);
        if (!equipo) return res.status(404).json({ ok: false, error: "Equipo no encontrado" });

        await equipo.destroy();
        res.json({ ok: true });
    } catch (error) {
        console.error(`DELETE /api/inventario/${req.params.id}`, error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

module.exports = router;




