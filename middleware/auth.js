const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.verifyTokenThenRefresh = (req, res, next) => {
  console.log("A")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json('Access token is missing');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      return this.verifyRefreshToken(req, res, next);
    }

    req.user = payload;
    next();
  });
};

exports.verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.token;

    if (!refreshToken) {
      return res.status(403).json('Refresh token is required');
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        return res.status(403).json('Invalid refresh token');
      }

      const user = await User.findOne({ where: { id: payload.id } });

      if (!user) {
        return res.status(400).json('User not found');
      }

      if (user.refreshToken !== refreshToken) {
        return res.status(403).json('Invalid refresh token');
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

      req.user = user;
      req.accessToken = accessToken;

      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error');
  }
};
