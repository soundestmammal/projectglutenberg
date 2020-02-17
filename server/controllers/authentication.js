const User = require('../models/user');

exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // See if a user with a given email exists...
    User.findOne({ email: email}, async (err, existingUser) => {
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
            res.json(user);
        });
    })



}