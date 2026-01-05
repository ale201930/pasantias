# Sistema de Inventario para el Área de Tecnología

## 📌 Descripción
El presente proyecto corresponde al desarrollo de un **Sistema de Inventario para el Área de Tecnología**, cuyo propósito es optimizar el registro, control, consulta y análisis de los equipos tecnológicos pertenecientes al area.

El sistema permite administrar de forma ordenada la información de los equipos, facilitando su seguimiento y mejorando la toma de decisiones mediante el uso de datos estadísticos. Fue desarrollado como parte de un **proyecto de pasantías académicas**, utilizando tecnologías web modernas y un entorno basado en **Node.js**.

El sistema está organizado en **tres módulos principales**, los cuales cumplen funciones específicas dentro del proceso de gestión del inventario:

### 🔹 Módulo de Registro
Este módulo permite el ingreso de los equipos tecnológicos al sistema. A través de este módulo se registran datos como el tipo de equipo, descripción, estado y observaciones, almacenando la información de manera segura en la base de datos del sistema.

### 🔹 Módulo de Inventario
El módulo de inventario permite visualizar y administrar todos los equipos previamente registrados. Facilita la consulta de la información, el control del inventario tecnológico y el seguimiento de los equipos existentes dentro del área de tecnología.

### 🔹 Módulo de Estadísticas
Este módulo ofrece información estadística basada en los datos registrados en el sistema. Permite analizar la cantidad de equipos, obtener datos resumidos y presentar la información de forma clara.

---

## ⚙️ Requisitos del Sistema
Para el correcto funcionamiento del sistema es necesario contar con los siguientes requisitos:
- Visual Studio Code como editor de código.
- Node.js para la ejecución del servidor y la gestión de dependencias.
- Git para la clonación y administración del repositorio.

---

## 📥 Instalación y Ejecución
El sistema se instala clonando el repositorio desde GitHub, instalando las dependencias necesarias mediante npm y ejecutando el servidor con Node.js.  
Una vez iniciado el servidor, el sistema se puede acceder desde el navegador web a través de `http://localhost:3000`.

---

## 🧩 Uso del Sistema
El usuario accede al sistema desde el navegador web y navega entre los distintos módulos mediante el menú principal.  
Desde el módulo de Registro se ingresan los equipos tecnológicos, en el módulo de Inventario se consultan y administran los equipos registrados, y en el módulo de Estadísticas se visualiza la información resumida y analítica del inventario.

El sistema está diseñado para ser intuitivo, permitiendo su uso por parte del personal del área de tecnología sin requerir conocimientos técnicos avanzados.

---

## 📂 Estructura del Proyecto
El proyecto está organizado de la siguiente manera:
├── config/ Configuración de la base de datos
├── middlewares/ Middlewares del sistema
├── models/ Modelos de la base de datos
├── public/ Archivos públicos (HTML, CSS y JavaScript)
├── routes/ Rutas del servidor
├── app.js Configuración principal de Express
├── server.js Inicialización del servidor
├── database.sqlite Base de datos del sistema
├── package.json Dependencias del proyecto
└── README.md Documentación del sistema


---


## 📄 Licencia
Este proyecto se distribuye bajo la **Licencia MIT**, permitiendo su uso, modificación y distribución con fines académicos y educativos.

---

## ✍️ Autores
**Alexander Almaguer** y **Luis Arcia** 
Proyecto desarrollado como parte del proceso de **Pasantías Académicas**, orientado a la gestión y control del inventario tecnológico del área de tecnología.


