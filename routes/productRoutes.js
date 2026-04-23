const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const { isAuthenticated } = require('../middleWares/authenticationMW');

router.get('/', isAuthenticated, ctrl.list);
router.get('/create', isAuthenticated, ctrl.getCreate);
router.post('/create', isAuthenticated, ctrl.postCreate);
router.get('/edit/:id', isAuthenticated, ctrl.getEdit);
router.post('/edit/:id', isAuthenticated, ctrl.postEdit);
router.post('/delete/:id', isAuthenticated, ctrl.delete);

module.exports = router;