const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./inventario.sqlite", // aquí se guarda tu base de datos
    logging: false
});

module.exports = sequelize;
