const Auth = require('../../models/backend/authModel');

const authModel = new Auth();

async function login(req, res) {
    const { correo, clave } = req.body;
    console.log('Datos recibidos:', { correo, clave }); // Verifica los datos recibidos
    
    try {
        const user = await authModel.autenticarUsuario(correo, clave);
        console.log('Resultado de autenticación:', user);
        
        if (user) {
            req.session.user = user;
            //res.status(200).json({ message: 'Login correcto.', user });
            res.redirect('/sitio-admin/dashboard');
        } else {
            req.flash('error_msg', 'Correo o contraseña incorrectos');
            res.status(401).json({ message: 'Usuario o Clave invalidos' });
        }
    } catch (error) {
        console.error('Error en el login:', error);
        req.flash('error_msg', 'Error interno del servidor');
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function logout(req, res) {
    try {
        req.session.destroy(err => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).json({ message: 'Error interno al cerrar sesión' });
            }
            res.redirect('/auth/login');
        });
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        req.flash('error_msg', 'Error interno al cerrar sesión');
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    login,
    logout
};
