const User = require('../models/userModel');

module.exports = {
    getUserProfileData: async (req, res) => {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
}
