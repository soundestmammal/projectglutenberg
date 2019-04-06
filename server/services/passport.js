const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Take the id we had previous stuffed in the cookie and do something
// turn an id into a mongoose model instance

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user=> {
            done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne( {googleId: profile.id }).then((existingUser) => {
                if (existingUser) {
                    // What is the deal with this done? Is it a passport js thing?
                    done(null, existingUser);
                    console.log("This is an existing user");
                } else {
                    new User({ googleId: profile.id })
                    .save()
                    .then(user => {
                        done(null, user);
                    })
                }
            });
        }
    )
);

/* ?? What is the next step ??

So far... we either make a new record or retrieve a new record.

We need to generate an identifying information in a cookie (Kinda Complicated)

1a) Log me in please
1b) You appear to be user_xyz let me give you a token
        call serializeUser(user) to generate the token and put it in the cookie
2a) Client makes a request (gives the cookie in request)
2b) Takes the cookie to deserialize the user. Identify the user.
        Ah. It appears to be userxyz, let's give them what they are looking for.


*/ 