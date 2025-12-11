const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");  // 👈 Ajusta la ruta según tu proyecto

const Inventario = sequelize.define("Inventario", {
    localidad: { type: DataTypes.STRING, allowNull: false },
    tipo_articulo: { type: DataTypes.STRING, allowNull: false },
    marca: { type: DataTypes.STRING },
    modelo: { type: DataTypes.STRING },
    serial: { type: DataTypes.STRING },
    procesador: { type: DataTypes.STRING },
    ram: { type: DataTypes.STRING },
    disco: { type: DataTypes.STRING },
    version_windows: { type: DataTypes.STRING },
    antivirus: { type: DataTypes.STRING },
    nombre_del_equipo: { type: DataTypes.STRING },
    ubicacion: { type: DataTypes.STRING },
    usuario_responsable: { type: DataTypes.STRING },
    ip: { type: DataTypes.STRING },
    bios: { type: DataTypes.STRING },
    fecha_de_asignacion: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING }
}, {
    tableName: "Inventarios",
    freezeTableName: true
});

module.exports = Inventario;

