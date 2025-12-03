const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("../models/user", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuario: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM("admin", "coordinador", "gerente", "visualizacion"),
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = User;
