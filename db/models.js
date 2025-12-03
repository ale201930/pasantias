const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

/* ==========================
   MODELO DE USUARIOS
========================== */
const bcrypt = require("bcryptjs");

const Usuario = sequelize.define("Usuario", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false }, // admin, visualA, visualB
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
    hooks: {
        beforeCreate: async (usuario) => {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(usuario.password, salt);
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed("password")) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            }
        }
    }
});


/* ==========================
   MODELO DE INVENTARIO
========================== */
const Inventario = sequelize.define("Inventario", {
    localidad: { type: DataTypes.STRING, allowNull: false },
    tipo_articulo: { type: DataTypes.STRING, allowNull: false },
    marca: { type: DataTypes.STRING },
    modelo: { type: DataTypes.STRING },
    serial: { type: DataTypes.STRING },

    // Datos generales
    usuario_responsable: { type: DataTypes.STRING },
    fecha_asignacion: { type: DataTypes.DATEONLY },
    estatus: { type: DataTypes.STRING, defaultValue: "Activo" },

    // Campos especiales para PC/Laptop
    procesador: { type: DataTypes.STRING },
    ram: { type: DataTypes.STRING },
    disco: { type: DataTypes.STRING },
    version_windows: { type: DataTypes.STRING },
    antivirus: { type: DataTypes.STRING },
    nombre_equipo: { type: DataTypes.STRING },
    ip: { type: DataTypes.STRING },
    mac: { type: DataTypes.STRING },
    tdr: { type: DataTypes.STRING },
    set_plox: { type: DataTypes.STRING },
    master: { type: DataTypes.STRING },
    cdpr: { type: DataTypes.STRING }
});

sequelize.sync();

module.exports = { Usuario, Inventario };
