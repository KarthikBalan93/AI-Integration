const express = require('express');
const { registerUser, registerAnonymousUser } = require('../controllers/userController');
const router = express.Router();

router.route('/anonymous').post(registerAnonymousUser);

module.exports = router;