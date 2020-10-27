const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../env-keys');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error('I could not find that user?');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.log('There was a problem... auth middleware');
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
