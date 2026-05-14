const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/profiles/' });

// All routes here are protected and require Admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/', userController.getUsers);
router.put('/profile', protect, upload.single('profilePicture'), userController.updateProfile);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id/status', userController.toggleStatus);

module.exports = router;