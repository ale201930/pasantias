const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inventario = sequelize.define("Inventario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    localidad: { type: DataTypes.STRING, allowNull: false },
    tipo_articulo: { type: DataTypes.STRING, allowNull: false },
    marca: { type: DataTypes.STRING, allowNull: true },
    modelo: { type: DataTypes.STRING, allowNull: true },
    serial: { type: DataTypes.STRING, allowNull: true },
    procesador: { type: DataTypes.STRING, allowNull: true },
    ram: { type: DataTypes.STRING, allowNull: true },
    disco: { type: DataTypes.STRING, allowNull: true },
    version_windows: { type: DataTypes.STRING, allowNull: true },
    antivirus: { type: DataTypes.STRING, allowNull: true },
    nombre_del_equipo: { type: DataTypes.STRING, allowNull: true },
    ubicacion: { type: DataTypes.STRING, allowNull: true },
    usuario_responsable: { type: DataTypes.STRING, allowNull: true },
    ip: { type: DataTypes.STRING, allowNull: true },
    bios: { type: DataTypes.STRING, allowNull: true },
    fecha_de_asignacion: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true }
}, {
    tableName: "Inventarios",
    freezeTableName: true,
    timestamps: false
});

module.exports = Inventario;



