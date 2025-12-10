const express = require("express");
const router = express.Router();
const Inventario = require("../models/inventario");

// POST /api/inventario/registrar
router.post("/registrar", async (req, res) => {
    try {
        const datos = req.body;

        await Inventario.create({
            localidad: datos.localidad,
            tipo_articulo: datos.tipo_articulo,
            marca: datos.marca || datos.Marca,
            modelo: datos.modelo || datos.Modelo,
            serial: datos.serial || datos.Serial,
            procesador: datos.procesador,
            ram: datos.ram,
            disco: datos.disco,
            version_windows: datos.version_windows,
            antivirus: datos.antivirus,
            nombre_del_equipo: datos.Nombre_del_Equipo,
            ubicacion: datos.Ubicacion,
            usuario_responsable: datos.usuario_responsable || datos.Usuario_Responsable,
            ip: datos.ip || datos.IP,
            bios: datos.Bios,
            fecha_de_asignacion: datos.Fecha_de_Asignacion,
            status: datos.Status
        });

        res.json({ ok: true });
    } catch (error) {
        console.error(error);
        res.json({ ok: false, error: error.message });
    }
});

// GET /api/inventario
router.get("/", async (req, res) => {
    try {
        const equipos = await Inventario.findAll({
            order: [["id", "DESC"]]
        });

        res.json({ ok: true, equipos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

module.exports = router;

