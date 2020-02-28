const jwt = require('jwt-simple');
const key = require('../config/keys');
const User = require('../models/user');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, key.secret);
}

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // See if a user with a given email exists...
    User.findOne({ email: email}, (err, existingUser) => {

        if (!email || !password) {
            return res.status(422).send({ error: 'You must provide a email and a password!!!'});
        }

        if (err) { return next(err); }
        
        // If a user with the email does exists
        if(existingUser) {
            return res.status(422).send({ error: 'Email is already in use' });
        }

        // If a user with an email does not exist, create and save user record
        const user = new User({ email: email, password: password }); // This is an in memory

        user.save(function(err) {
            if (err) { return next(err); }
            // Respond to incoming request
            res.json({ token: tokenForUser(user) });
        });
    });
}