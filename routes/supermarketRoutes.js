const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/superMController');
const { isAuthenticated } = require('../middleWares/authenticationMW');
const { isAdmin } = require('../middleWares/roleMW');

router.get('/', isAuthenticated, ctrl.list);
router.get('/create', isAuthenticated, ctrl.getCreate);
router.post('/create', isAuthenticated, ctrl.postCreate);
router.post('/approve/:id', isAuthenticated, isAdmin, ctrl.approve);

module.exports = router;