const express = require('express');
const router = express.Router();
const supermarketController = require('../controllers/supermarketController');

router.get('/', supermarketController.list);
router.get('/create', supermarketController.create);
router.post('/create', supermarketController.save);

// approve
router.get('/approve/:id', supermarketController.approve);

module.exports = router;