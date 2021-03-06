const axios = require('axios');
const algorithm = require('../algorithm');
const getGFBiz = require('../getGFBiz');
const { yelp } = require('../env-keys');

class BusinessService {
    async query(lat, lng, searchbox) {

        // Make a request to the Yelp API
        const YELP_API_KEY = yelp;
        const options = {
            headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        };

        try {
            const response = await axios.get(
                `https://api.yelp.com/v3/businesses/search?term=${searchbox}&latitude=${lat}&longitude=${lng}`,
                options
            );

            // Reformat the data that comes back from yelp api
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

            // Create a location object for the search query
            let coords = {
                latitude: lat,
                longitude: lng,
            };

            // console.log(data);

            // Combine data from yelp and Oasis DB to serve client request
            data = await algorithm(data, coords);
            return ({ data });
        } catch (e) {
            console.log(e);
        }
    }

    async getBusinessByID(businessId) {
        const YELP_API_KEY = yelp;
        const options = {
            headers: { Authorization: `Bearer ${YELP_API_KEY}` },
        };

            const inGFDB = await getGFBiz(businessId);
            if (inGFDB.length) {
                return (inGFDB[0]);
            }
            const response = await axios.get(
                `https://api.yelp.com/v3/businesses/${businessId}`,
                options
            );

        return response.data;
    }
}

module.exports = BusinessService;