const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/profiles/' }); // Temporary storage logic

router.post('/register', upload.single('profilePicture'), authController.register);
router.post('/login', authController.login);

module.exports = router;