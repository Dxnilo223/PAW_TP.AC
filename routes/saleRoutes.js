const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

router.get('/create', salesController.create);
router.post('/create', salesController.save);
router.get('/', salesController.list);

module.exports = router;