const express = require('express');
const router = express.Router();
const planeta_controller = require('../controllers/planeta.controller');

// Cria um novo planeta.
router.post('/', planeta_controller.CriaPlaneta);

// Buscar todos os planetas.
router.get('/', planeta_controller.BuscarPlanetas);

router.param('id', function(request, response, next, id) {
    next();
});  

// Busca por ID.
router.get('/:id', planeta_controller.BuscarPlaneta);

router.delete('/:id', planeta_controller.DeletarPlaneta);

module.exports = router;
