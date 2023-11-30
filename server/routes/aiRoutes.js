const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware')

const { sendMessage } = require('../controllers/chatController');
const { generateImage } = require('../controllers/imageController');

router.route('/chat/message').post(protect, sendMessage);
router.route('/image/generate').post(protect, generateImage);

module.exports = router;