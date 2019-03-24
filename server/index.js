const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: 'auth/google/callback'
        },
        (accessToken) => {
            console.log(accessToken);
        }
    )
);

app.get('/', (req, res) => {
    res.send('<h1>Project Glutenberg</h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Application is running on Port ${PORT}`);
});
