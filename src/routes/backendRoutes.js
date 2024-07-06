const express = require('express');
const router = express.Router();
const loadAppHtml = require('../utils/loadAppHtml');
const authMiddleware = require('../controllers/middlewares/authMiddleware');
const { dashboard } = require('../controllers/backend/dashboardController');
const { usuarios } = require('../controllers/backend/usuariosController');
const { ingresarCliente, listarClientes, editarCliente, agregarCliente, guardarEdicion } = require('../controllers/backend/clientesController');
const { ingresarServicio, listarServicios, editarServicio, guardarEdicionS, agregarServicio } = require('../controllers/backend/serviciosController');

const tipo_plantilla = 'backend';

router.get('/dashboard', authMiddleware, dashboard);

router.get('/modulo-usuarios', authMiddleware, usuarios);

router.get('/modulo-ingresar-clientes', authMiddleware, ingresarCliente);
router.post('/modulo-ingresar-clientes', authMiddleware, agregarCliente);
router.get('/modulo-listar-clientes', authMiddleware, listarClientes);
router.get('/modulo-editar-cliente/:id', authMiddleware, editarCliente);
router.post('/modulo-editar-cliente', authMiddleware, guardarEdicion);

router.get('/modulo-ingresar-servicio', authMiddleware, ingresarServicio);
router.post('/modulo-ingresar-servicio', authMiddleware, agregarServicio);
router.get('/modulo-listar-servicio', authMiddleware, listarServicios);
router.get('/modulo-editar-servicio/:id', authMiddleware, editarServicio);
router.post('/modulo-editar-servicio', authMiddleware, guardarEdicionS);

router.get('/modulo-proveedores', authMiddleware, (req, res) => {
    loadAppHtml(tipo_plantilla, 'proveedores', `${process.env.APP_NAME}: Módulo Proveedores`, 'Gestión de Proveedores', res);
});

module.exports = router;
