const express = require('express');
const router = express.Router();
const receitaController = require('../controllers/receitaController');

router.get('/', receitaController.listReceitas);
router.get('/:id', receitaController.getReceitaById);
router.post('/', receitaController.createReceita);
router.put('/:id', receitaController.updateReceita);
router.delete('/:id', receitaController.deleteReceita);

module.exports = router;
