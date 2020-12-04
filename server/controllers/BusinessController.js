const axios = require('axios');
const algorithm = require('../algorithm');
const getGFBiz = require('../getGFBiz');
const { yelp } = require('../env-keys');

class BusinessController {
    /**
     * @description Each method is a route handler for an API Endpoint
     * @param {req, res}
     * @return res status and optional body
     */

    async query (req, res) {
        const YELP_API_KEY = yelp;
        let lat = req.query.latitude;
        let lng = req.query.longitude;
        let searchbox = req.query.searchbox;

        const options = {
            headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        };
        const response = await axios.get(
            `https://api.yelp.com/v3/businesses/search?term=${searchbox}&latitude=${lat}&longitude=${lng}`,
            options
        );
        let data = response.data.businesses;
        for (let i = 0; i < data.length; i++) {
            let newObject = {
            name: data[i].name,
            coordinates: data[i].coordinates,
            location: data[i].location.display_address,
            image: data[i].image_url,
            price: data[i].price,
            phone: data[i].phone,
            categories: data[i].categories,
            id: data[i].id,
            };
            data[i] = { ...newObject };
        }
        let coords = {
            latitude: lat,
            longitude: lng,
        };
        console.log(data);
        data = await algorithm(data, coords);
        res.send(data);
    }

    async getBusinessByID(req, res) {
        const YELP_API_KEY = yelp;
        const options = {
            headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        };
        const inGFDB = await getGFBiz(req.params.id);
        if (inGFDB.length) {
            res.send(inGFDB[0]);
        } else {
            const response = await axios.get(
            `https://api.yelp.com/v3/businesses/${req.params.id}`,
            options
            );
            res.send(response.data);
        }
    }
}

module.exports = BusinessController;