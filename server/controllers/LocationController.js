const axios = require('axios');
const { openCage } = require('../env-keys');

// My Services
const LocationService = require('../services/LocationService');
const LocationServiceInstance = new LocationService();

class LocationController {
    async getClientLocation (req, res) {
        try {
            const result = await LocationServiceInstance.client(req.ip);
            return res.send({ latitude: result.body.data.latitude, longitude: result.body.data.longitude });
        }
        catch(e) {
            res.status(500).send(e);
        }
    }

    async forwardGeocode (req, res) {
        console.log('This runs here line 10!');
        const { location, lat, lng } = req.query;
        try {
            const response = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${location}&proximity=${lat},${lng}&key=${openCage}`
            );
            res.send(response.data.results[0].geometry);
        } catch (e) {
            res.status(500).send();
        }
    }
}

module.exports = LocationController;