const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// require auth, is the helper function to "hey are you authenticated"
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
    // requireAuth is basically middleware?
    app.get('/', requireAuth, (req, res) => {
        res.send({ hey: "there" });
    });
    app.post('/signup', Authentication.signup );
}