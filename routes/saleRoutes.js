const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// GET → mostrar página de criação de venda
router.get('/create', salesController.create);

// POST → guardar venda
router.post('/create', salesController.save);

module.exports = router;