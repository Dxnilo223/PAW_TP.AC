const express = require('express');
const router = express.Router();
const superMController = require('../controllers/superMController');
const { isAuthenticated } = require('../middleWares/authenticationMW');
const { isAdmin } = require('../middleWares/roleMW');

router.get('/', isAuthenticated, superMController.list);
router.get('/create', isAuthenticated, superMController.getCreate);
router.post('/create', isAuthenticated, superMController.postCreate);
router.post('/approve/:id', isAuthenticated, isAdmin, superMController.approve);

module.exports = router;