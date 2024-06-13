const User = require('../models/user');

exports.checkRole = (roles) => {
  return async (req, res, next) => {
    try {
      const user = await User.findOne({ where: { id: req.user.id } });

      if (!user) {
        return res.status(400).json('User not found');
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json('Forbidden: you do not have the required permissions');
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  };
};
