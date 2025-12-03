const express = require('express');
const app = express();
const path = require('path');

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Para recibir datos JSON del formulario
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
const inventarioRoutes = require('./routes/inventario');
app.use('/api/inventario', inventarioRoutes);

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));




