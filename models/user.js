// models/user.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcrypt");

const User = sequelize.define("User", {
    usuario: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false },
    activo: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// Hashear contraseña antes de crear usuario
User.beforeCreate(async (user, options) => {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
});

module.exports = User;

