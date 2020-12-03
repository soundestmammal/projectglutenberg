const axios = require('axios');
const { ipGeolocation } = require('../env-keys');

class LocationService {
    /**
     * @description Fetch a GPS approximation for the client's location
     * @param {String} ipAddress String that contains the IP Address from Request Header
     * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
     */
    async client(ipAddress) {
        if (ipAddress === '::1' || ipAddress.includes('192.168.32')) {
            // Random IP for development
            ipAddress = '64.94.159.111';
        }
        try {
            const response = await axios.get(
                `https://api.ipgeolocation.io/ipgeo?apiKey=${ipGeolocation}&ip=${ipAddress}`
            );
            return ({
                success: true,
                body: response,
            });
        } catch (e) {
            return ({
                success: false,
                body: e
            });
        }
    }
}

module.exports = LocationService;