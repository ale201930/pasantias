const bcrypt = require("bcryptjs");
const Usuario = require("./models/user");
const sequelize = require("./config/database");

async function crear() {
    await sequelize.sync();

    const password = await bcrypt.hash("123456", 10);

    await Usuario.create({
        nombre: "Administrador",
        usuario: "admin",
        password: password,
        rol: "admin",
        activo: true
    });

    console.log("Administrador creado correctamente ✔");
    process.exit();
}

crear();
