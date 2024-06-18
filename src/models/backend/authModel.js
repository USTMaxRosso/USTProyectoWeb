const bcrypt = require('bcrypt');
const DataBase = require('../conexionModel');

class Auth {
    constructor() {
        this.db = DataBase.getInstance();
    }

    async autenticarUsuario(email, password) {
        try {
            // Obtener el usuario por nombre de usuario
            const query = 'SELECT id, email, clave FROM users WHERE email = ? AND estado = 1';
            const [rows] = await this.db.ejecutarQuery(query, [email]);
    
            console.log('Resultado de la consulta SQL en autenticarUsuario:', rows); // Verificar resultados de la consulta
    
            // Verificar si se encontró un usuario
            if (rows) {
                const user = rows;
                console.log('Contraseña encriptada en DB:', user.clave); // Verificar la clave almacenada
    
                const isMatch = await bcrypt.compare(password, user.clave);
                console.log('Resultado de bcrypt.compare:', isMatch); // Verificar resultado de comparación
    
                if (isMatch) {
                    return { id: user.id, email: user.email };
                } else {
                    return null; // Contraseña incorrecta
                }
            } else {
                return null; // Usuario no encontrado
            }
        } catch (error) {
            console.error('Error al autenticar usuario:', error); // Manejar errores
            return null;
        }
    }
    
}

module.exports = Auth;
