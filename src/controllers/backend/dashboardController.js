const  loadAppHtml  = require('../../utils/loadAppHtml');

function dashboard(req, res){
    let user = req.session.user;
    loadAppHtml('backend', 'dashboard', `${process.env.APP_NAME}: Dashboard`, `${ user.nombre } Bienvenido al panel de administración`, res);
}

module.exports = {
    dashboard
}