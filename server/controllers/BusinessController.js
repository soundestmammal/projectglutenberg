// Services
const BusinessService = require('../services/BusinessService');
const BusinessServiceInstance = new BusinessService();

class BusinessController {
    /**
     * @description Each method is a route handler for an API Endpoint
     * @param {req, res}
     * @return res status and optional body
     */

    async query (req, res) {
        let lat = req.query.latitude;
        let lng = req.query.longitude;
        let searchbox = req.query.searchbox;

        const result = await BusinessServiceInstance.query(lat, lng, searchbox);
        res.send(result);
    }

    async getBusinessByID(req, res) {
        const result = await BusinessServiceInstance.getBusinessByID(req.params.id);
        res.send(result);
    }
}

module.exports = BusinessController;