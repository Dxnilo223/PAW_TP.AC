const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// LIST
router.get('/', productController.list);

// CREATE
router.get('/create', productController.create);
router.post('/create', productController.save);

// EDIT 
router.get('/edit/:id', productController.edit);
router.post('/update/:id', productController.update);

// DELETE
router.get('/delete/:id', productController.delete);

// VIEW 
router.get('/:id', productController.view);

module.exports = router;