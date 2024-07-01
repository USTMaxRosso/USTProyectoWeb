const  loadAppHtml  = require('../../utils/loadAppHtml');

function usuarios(req, res){
    loadAppHtml('backend', 'usuarios', `${process.env.APP_NAME}: Dashboard`, 'Módulo Usuarios', res);
}
module.exports = {
    usuarios
};