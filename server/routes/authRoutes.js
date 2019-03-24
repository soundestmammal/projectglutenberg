const passport = require('passport');

module.exports = (app) => {
app.get('/', (req, res) => {
    res.send('<h1>Project Glutenberg</h1>');
});

app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));
}