const { Sequelize } = require("sequelize");
const path = require("path");

// Conexión SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"), // archivo SQLite en la raíz
    logging: false
});

module.exports = sequelize;





