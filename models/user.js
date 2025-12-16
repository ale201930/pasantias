const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // asegúrate que apunta correctamente

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false, defaultValue: "usuario" }
}, {
    tableName: "Users",
    freezeTableName: true,
    timestamps: false
});

module.exports = User;



