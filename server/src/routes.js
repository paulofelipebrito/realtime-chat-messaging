const { Router } = require('express');

const LoginController = require('../src/controllers/LoginController');
const SignupController = require('../src/controllers/SignupController');
const router = Router();

router.post('/auth/signup', LoginController.store);
router.post('/auth/login', LoginController.store);

module.exports = router;