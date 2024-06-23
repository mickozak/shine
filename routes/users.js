// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.put('/update/:id', auth.verifyTokenThenRefresh, userController.updateUser);
router.get('/activate/:token', userController.activateAccount);

//router.get('/users', auth.verifyTokenThenRefresh, roleCheck.checkRole(['admin']), userController.getAllUsers);
router.get('/users', auth.verifyTokenThenRefresh, userController.getAllUsers);


module.exports = router;
