const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/backend/authController');
const loadAppHtml = require('../utils/loadAppHtml');

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/backend/auth/login.html'));
});

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/backend/auth/register.html'));
});


router.post('/login', authController.login);

router.get('/logout', authController.logout);

module.exports = router;
