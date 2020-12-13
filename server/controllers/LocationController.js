const LocationService = require('../services/LocationService');
const LocationServiceInstance = new LocationService();

class LocationController {
    async getClientLocation (req, res) {
        try {
            // Output: Result == { latitude, longitude}
            const result = await LocationServiceInstance.getClientLocation(req.ip);
            const { latitude, longitude } = result;
            return res.send({ latitude: latitude, longitude: longitude });
        }
        catch(e) {
            res.status(500).send(e);
        }
    }

    async forwardGeocode (req, res) {
        const { location, lat, lng } = req.query;
        try {
            const result = await LocationServiceInstance.forwardGeocode(location, lat, lng);
            const { latitude, longitude } = result;
            return res.send({ latitude: latitude, longitude: longitude });
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

module.exports = LocationController;