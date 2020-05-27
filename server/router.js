const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const axios = require('axios');
const { yelp } = require('./config/keys');

// require auth, is the helper function to "hey are you authenticated"
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app) {
    app.get('/', requireAuth, (req, res) => {
        res.send({ hey: "there" });
    });
    app.post('/signup', Authentication.signup );

    app.get('/yelp', async(req, res) => {
        let lat = req.query.latitude;
        let lng = req.query.longitude;
        let searchbox = req.query.searchbox;
        const options = {
            headers: {'Authorization': yelp}
        }
        const response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${searchbox}&latitude=${lat}&longitude=${lng}`, options);
        const data = response.data.businesses;
        for(let i = 0; i < data.length; i++) {
                let newObject = {
                    name: data[i].name,
                    coordinates: data[i].coordinates,
                    location: data[i].location.display_address,
                    image: data[i].image_url,
                    price: data[i].price,
                    phone: data[i].phone,
                    categories: data[i].categories,
                    id: data[i].id
                };
                data[i] = {...newObject};
        }
        res.send(data);
    });

    app.get('/yelp/business/:id', async(req, res) => {
        const options = {
            headers: {'Authorization': yelp}
        }
        const response = await axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, options);
        res.send(response.data);
    })
}