const express = require("express");
const router = express.Router();
const Inventario = require("../models/inventario");
const { Op, fn, col, where } = require("sequelize");

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

// GET /api/inventario (con filtros y búsqueda)
router.get("/", async (req, res) => {
    try {
        const { buscar, tipo_articulo, localidad, marca, modelo, serial, usuario_responsable, status } = req.query;

        // Filtros exactos
        const filtros = {};
        if (tipo_articulo) filtros.tipo_articulo = tipo_articulo;
        if (localidad) filtros.localidad = localidad;
        if (marca) filtros.marca = marca;
        if (modelo) filtros.modelo = modelo;
        if (serial) filtros.serial = serial;
        if (usuario_responsable) filtros.usuario_responsable = usuario_responsable;
        if (status) filtros.status = status;

        // Búsqueda general insensible a mayúsculas
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

        const equipos = await Inventario.findAll({
            where: filtros,
            order: [["id", "DESC"]]
        });

        res.json({ ok: true, equipos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: error.message });
    }
});

module.exports = router;

