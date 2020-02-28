const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys');

// What do we need this Passport JWT Strategy and ExtractJwt...
// What does all of this mean?
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if the user ID in the payload exists in our DB
    // If it does then call "done"
    
    // If call done without a user object
    User.findById(payload.sub, (err, user) => {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
