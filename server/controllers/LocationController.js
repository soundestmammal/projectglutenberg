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
        const { location, lat, lng } = req.query;
        try {
            const result = await LocationServiceInstance.forwardGeocode(location, lat, lng);
            res.send(result.body.data.results[0].geometry);
        } catch (e) {
            res.status(500).send();
        }
    }
}

module.exports = LocationController;