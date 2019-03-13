const express = require('express');
const router = express.Router();
const planeta_controller = require('../controllers/planeta.controller');

router.get('/planetas', planeta_controller.test);

module.exports = router;
