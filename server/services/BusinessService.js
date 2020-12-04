const axios = require('axios');
const algorithm = require('../algorithm');
const getGFBiz = require('../getGFBiz');
const { yelp } = require('../env-keys');

class BusinessService {
    async query(lat, lng, searchbox) {
        const YELP_API_KEY = yelp;
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
        return { status: 'success', body: data }
    }

    async getBusinessByID(businessId) {
        const YELP_API_KEY = yelp;
        const options = {
            headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        };
        const inGFDB = await getGFBiz(businessId);
        if (inGFDB.length) {
            return {status: 'success', body: inGFDB[0]}
        } else {
            const response = await axios.get(
            `https://api.yelp.com/v3/businesses/${businessId}`,
            options
            );
            return { status: 'success', body: response.data}
        }
    }
}

module.exports = BusinessService;