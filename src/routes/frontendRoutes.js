const express = require('express');
const router = express.Router();
const loadAppHtml = require('../utils/loadAppHtml');

const tipo_plantilla = 'frontend';

router.get('/', (req, res) => {
    loadAppHtml(tipo_plantilla, 'index',`${process.env.APP_NAME}: Home` , 'Bienvenido al sitio principal', res);
});

router.get('/nosotros', (req, res) => {
    loadAppHtml(tipo_plantilla, 'nosotros', `${process.env.APP_NAME}: Nosotros`, 'Misión: Lorem ipsum dolor.', res);
});

router.get('/servicios', (req, res) => {
    loadAppHtml(tipo_plantilla, 'servicios', `${process.env.APP_NAME}: Servicios`, 'Diseño y Desarrollo Web.', res);
});

router.get('/contacto', (req, res) => {
    loadAppHtml(tipo_plantilla, 'contacto', `${process.env.APP_NAME}: Contacto`, 'Correo de contacto: example@example.cl', res);
});

module.exports = router;
