const express = require("express");
const { Op } = require("sequelize");
const Inventario = require("../models/inventario");

module.exports = (io) => {
    const router = express.Router();

    // 🔹 REGISTRAR EQUIPO
    router.post("/registrar", async (req, res) => {
        try {
            console.log("Datos recibidos:", req.body);
            const datos = req.body;

            // Solo campos obligatorios
            const requiredFields = ["localidad", "tipo_articulo"];
            for (const field of requiredFields) {
                if (!datos[field]) {
                    return res.status(400).json({ ok: false, error: `${field} es obligatorio` });
                }
            }

            // Convertir campos vacíos a null
            for (const key in datos) {
                if (datos[key] === "" || datos[key] === undefined) datos[key] = null;
            }

            // Crear registro en BD
            await Inventario.create(datos);

            // 🔔 Notificar a los clientes conectados
            io.emit("actualizar-inventario");

            res.json({ ok: true });
        } catch (error) {
            console.error("Error al registrar:", error);
            if (error.errors) {
                const mensajes = error.errors.map(e => e.message).join(", ");
                return res.status(400).json({ ok: false, error: mensajes });
            }
            res.status(500).json({ ok: false, error: error.message });
        }
    });

    // 🔹 OBTENER INVENTARIO (con filtros y búsqueda)
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

            if (buscar && buscar.trim() !== "") {
                const b = `%${buscar.trim()}%`;
                filtros[Op.or] = [
                    { nombre_del_equipo: { [Op.like]: b } },
                    { serial: { [Op.like]: b } },
                    { usuario_responsable: { [Op.like]: b } },
                    { marca: { [Op.like]: b } },
                    { modelo: { [Op.like]: b } }
                ];
            }

            const equipos = await Inventario.findAll({
                where: filtros,
                order: [["id", "DESC"]]
            });

            res.json({ ok: true, equipos });
        } catch (error) {
            console.error("Error al obtener inventario:", error);
            res.status(500).json({ ok: false, error: error.message });
        }
    });

    // 🔹 OBTENER UN EQUIPO POR ID
    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const equipo = await Inventario.findByPk(id);
            if (!equipo) return res.status(404).json({ ok: false, error: "Equipo no encontrado" });
            res.json({ ok: true, equipo });
        } catch (error) {
            console.error("Error al obtener equipo:", error);
            res.status(500).json({ ok: false, error: error.message });
        }
    });

    // 🔹 ACTUALIZAR UN EQUIPO
    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const datos = req.body;

        try {
            const equipo = await Inventario.findByPk(id);
            if (!equipo) return res.status(404).json({ ok: false, error: "Equipo no encontrado" });

            // Convertir campos vacíos a null
            for (const key in datos) {
                if (datos[key] === "" || datos[key] === undefined) datos[key] = null;
            }

            await equipo.update(datos);

            // 🔔 Notificar cambios
            io.emit("actualizar-inventario");

            res.json({ ok: true });
        } catch (error) {
            console.error("Error al actualizar equipo:", error);
            res.status(500).json({ ok: false, error: error.message });
        }
    });

    // 🔹 ELIMINAR UN EQUIPO
    router.delete("/:id", async (req, res) => {
        const { id } = req.params;

        try {
            const equipo = await Inventario.findByPk(id);
            if (!equipo) return res.status(404).json({ ok: false, error: "Equipo no encontrado" });

            await equipo.destroy();

            // 🔔 Notificar cambios
            io.emit("actualizar-inventario");

            res.json({ ok: true });
        } catch (error) {
            console.error("Error al eliminar equipo:", error);
            res.status(500).json({ ok: false, error: error.message });
        }
    });

    return router;
};




