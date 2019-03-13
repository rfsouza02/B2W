const express = require('express');
const router = express.Router();
const planeta_controller = require('../controllers/planeta.controller');

// Cria um novo planeta.
router.post('/planetas', planeta_controller.CriaPlaneta);

module.exports = router;
