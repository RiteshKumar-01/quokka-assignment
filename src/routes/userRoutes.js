const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/get-profile', verifyToken, userController.getUserProfileData);

module.exports = router;
