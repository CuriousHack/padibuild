const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all editors/admins
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['createdAt', 'DESC']]
        });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

// Update an Editor (Role, Name, Username)
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, username, role, isActive } = req.body;

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ firstName, lastName, username, role, isActive });

        res.json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Could not update user', error: error.message });
    }
};

// Remove a User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'User not found' });
        
        // Prevent admin from deleting themselves accidentally
        if (user.id === req.user.id) {
            return res.status(400).json({ message: 'You cannot delete your own admin account' });
        }

        await user.destroy();
        res.json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Could not delete user', error: error.message });
    }
};


// Toggle Active State
exports.toggleStatus = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.id === req.user.id) return res.status(400).json({ message: "Cannot deactivate yourself" });

        user.isActive = !user.isActive;
        await user.save();
        res.json({ success: true, message: 'Status updated successfully', isActive: user.isActive });
    } catch (error) {
        console.error("🔥 STATUS TOGGLE ERROR:", error); // Dev log
        res.status(500).json({ message: 'Could not toggle status', error: error.message });
    }
};

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const { firstName, lastName, username, password } = req.body;

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (username) user.username = username;

        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        if (req.file) {
            user.profilePicture = `uploads/profiles/${req.file.filename}`;
        }

        await user.save();
        res.json({ 
            success: true,
            message: 'Profile updated successfully',
            user: { 
                username: user.username, 
                profilePicture: user.profilePicture,
                firstName: user.firstName,
                lastName: user.lastName
            } 
        });
    } catch (error) {
        console.error("🔥 PROFILE UPDATE ERROR:", error); // Dev log
        res.status(500).json({ message: 'Could not update profile', error: error.message });
    }
};