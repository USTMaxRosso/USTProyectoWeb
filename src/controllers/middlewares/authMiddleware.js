// authMiddleware.js

// Middleware para verificar la sesión del usuario
function authMiddleware(req, res, next) {
    if (req.session && req.session.user) {
        // Si existe una sesión de usuario, continua con la solicitud
        next();
    } else {
        // Si no existe una sesión de usuario, redirige al formulario de inicio de sesión
        req.flash('error_msg', 'Acceso no autorizado. Por favor, inicie sesión.');
        res.redirect('/auth/login');
    }
}

module.exports = authMiddleware;
