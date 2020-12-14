const axios = require('axios');
const { ipGeolocation, openCage } = require('../env-keys');

class LocationService {
    /**
     * @description Fetch a GPS approximation for the client's location
     * @param {String} ipAddress String that contains the IP Address from Request Header
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async getClientLocation(ipAddress) {
        if (ipAddress === '::1' || ipAddress.includes('192.168.32') || ipAddress.includes('172.17.0.1') || ipAddress.includes('127.0.0.1')) {
            // Random IP for development
            ipAddress = '64.94.159.111';
        }
        try {
            const response = await axios.get(
                `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeolocation}&ip=${ipAddress}`
            );
            const { latitude, longitude } = response.data;
            return ({
                latitude,
                longitude
            });
        } catch (e) {
            return { error: e };
        }
    }

    /**
     * @description Fetch a GPS approximation for client's location query
     * @param {String} query A geographical place submitted by the client ex. Sacramento
     * @returns {Promise<{latitude: String, longitude: String}|{error: String}>}
     */
    async forwardGeocode(query, lat, lng) {
        const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&proximity=${lat},${lng}&key=${openCage}`
        );
        const location = response.data.results[0].geometry;
        return ({
            latitude: location.lat,
            longitude: location.lng
        })
    }
}

module.exports = LocationService;