const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

passport.use(new GoogleStrategy());

app.get('/', (req, res) => {
    res.send('<h1>Project Glutenberg</h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Application is running on Port ${PORT}`);
});

clientid: 652684636409-mmsbb060cn9gkifstrjobqg0ci4i09qu.apps.googleusercontent.com
secret: uKpu_SclnL7Eigv-vmoa_RAs