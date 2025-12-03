function cargarModulo(nombre) {
    document.getElementById("tituloModulo").textContent = nombre.charAt(0).toUpperCase() + nombre.slice(1);

    const contenido = document.getElementById("contenido");

    if (nombre === "dashboard") {
        contenido.innerHTML = `
            <h2>Dashboard General</h2>
            <p>Aquí irán las estadísticas del sistema.</p>
        `;
    }

    if (nombre === "registro") {
    contenido.innerHTML = `
        <div class="card">
            <h2>Registro de Artículos</h2>

            <form id="formRegistro">

                <label>Localidad:</label>
                <select name="localidad" required>
                    <option value="">Seleccione</option>
                    <option>San Sebastián – Planta INVCEM</option>
                    <option>Oficinas – Caracas</option>
                </select>

                <label>Tipo de artículo:</label>
                <select name="tipo_articulo" id="tipoArticulo" required onchange="mostrarCampos()">
                    <option value="">Seleccione</option>
                    <option value="PC">Computador de Escritorio</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Impresora">Impresora</option>
                    <option value="Red">Equipos de Red</option>
                    <option value="Otro">Otro</option>
                </select>

                <div id="camposExtra"></div>

                <button type="submit" class="btn">Guardar Artículo</button>
            </form>

            <p id="msgRegistro"></p>
        </div>
    `;
}


    if (nombre === "inventario") {
        contenido.innerHTML = `
            <h2>Inventario General</h2>
            <p>Aquí irá la tabla con filtros y búsqueda.</p>
        `;
    }

    if (nombre === "usuarios") {
        contenido.innerHTML = `
            <h2>Gestión de Usuarios</h2>
            <p>Crear, editar, eliminar y activar/desactivar usuarios.</p>
        `;
    }
}

function mostrarCampos() {
    const tipo = document.getElementById("tipoArticulo").value;
    const extra = document.getElementById("camposExtra");

    let campos = "";

    if (tipo === "PC" || tipo === "Laptop") {
        campos = `
            <label>Marca:</label>
            <input name="marca" required>

            <label>Modelo:</label>
            <input name="modelo" required>

            <label>Serial:</label>
            <input name="serial" required>

            <label>Procesador:</label>
            <input name="procesador">

            <label>RAM:</label>
            <input name="ram">

            <label>Disco duro:</label>
            <input name="disco">

            <label>Versión Windows:</label>
            <input name="version_windows">

            <label>Antivirus:</label>
            <input name="antivirus">

            <label>Usuario responsable:</label>
            <input name="usuario_responsable">

            <label>IP:</label>
            <input name="ip">

            <label>MAC:</label>
            <input name="mac">
        `;
    }

    if (tipo === "Monitor") {
        campos = `
            <label>Marca:</label>
            <input name="marca" required>

            <label>Modelo:</label>
            <input name="modelo" required>

            <label>Serial:</label>
            <input name="serial" required>
        `;
    }

    if (tipo === "Impresora") {
        campos = `
            <label>Marca:</label>
            <input name="marca" required>

            <label>Modelo:</label>
            <input name="modelo" required>

            <label>Tipo de Impresión:</label>
            <input name="impresion" placeholder="Laser / Tinta / Térmica">
        `;
    }

    if (tipo === "Red") {
        campos = `
            <label>Tipo de equipo:</label>
            <input name="modelo" placeholder="Switch / Router / Access Point" required>

            <label>MAC:</label>
            <input name="mac">

            <label>IP:</label>
            <input name="ip">
        `;
    }

    if (tipo === "Otro") {
        campos = `
            <label>Descripción del artículo:</label>
            <input name="modelo">
        `;
    }

    extra.innerHTML = campos;
}

document.addEventListener("submit", async (e) => {
    if (e.target.id !== "formRegistro") return;
    e.preventDefault();

    const form = new FormData(e.target);
    const datos = Object.fromEntries(form.entries());

    const res = await fetch("/api/inventario/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    const data = await res.json();

    const msg = document.getElementById("msgRegistro");

    if (data.ok) {
        msg.style.color = "green";
        msg.textContent = "Artículo registrado correctamente ✔️";
        e.target.reset();
        document.getElementById("camposExtra").innerHTML = "";
    } else {
        msg.style.color = "red";
        msg.textContent = "Error: " + data.error;
    }
});

