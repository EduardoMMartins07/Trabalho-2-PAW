const express = require('express');
const router = express.Router();

// Rotas para autenticação e usuários
router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/movies', require('./movies'));


module.exports = router;
