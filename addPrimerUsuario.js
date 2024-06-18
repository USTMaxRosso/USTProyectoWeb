// addFirstUser.js
require('dotenv').config();

const mysql = require('mysql');
const bcrypt = require('bcrypt');
const DataBase = require('./src/models/conexionModel'); // Asegúrate de ajustar la ruta según tu estructura de archivos

// Configurar la conexión a la base de datos
const db = DataBase.getInstance();

// Datos del primer usuario
const username = 'example@example.cl'; // El correo electronico es el Nombre de usuario, modificalo por el tuyo.
const password = '123456'; // Cambia la Contraseña por una segura.

// Hash de la contraseña antes de almacenarla en la base de datos
bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
        console.error('Error al cifrar la contraseña:', err);
        return;
    }

    try {
        // Insertar el primer usuario en la base de datos
        const query = 'INSERT INTO users (nombre, email, clave, estado) VALUES (?, ?, ?, ?)';
        const result = await db.ejecutarQuery(query, ['Webmaster', username, hashedPassword, '1']);
        console.log('Usuario agregado correctamente:', result);

        // Cerrar la conexión a la base de datos
        db.cerrarConexion();
    } catch (error) {
        console.error('Error al agregar usuario:', error);
        // Asegúrate de manejar los errores adecuadamente aquí
    }
});
