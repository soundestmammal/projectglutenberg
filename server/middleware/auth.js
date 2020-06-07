const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const User = require('../models/User');

const auth = async (req, res, next) => {
    console.log("1. Inside of the middleware");
    console.log(req.body);
    // console.log(req.body.header('Authorization'));
    // console.log("This is the req object", req);
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        console.log(token);
        const decoded = jwt.verify(token, jwtSecret);
        console.log("DECODED", decoded);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if(!user) {
            throw new Error('I could not find that user?');
        }

        req.user = user;
        req.token = token;
        next();
    } catch(e) {
        console.log("There was a problem... auth middleware")
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = auth;