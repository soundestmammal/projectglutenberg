// Services
const BusinessService = require('../services/BusinessService');
const BusinessServiceInstance = new BusinessService();

class BusinessController {
    /**
     * @description Each method is a route handler for an API Endpoint
     * @param {req, res}
     * @return response for client
     */

    async query (req, res) {
        let lat = req.query.latitude;
        let lng = req.query.longitude;
        let searchbox = req.query.searchbox;
        console.log('THIS IS THE QUERY', req.query);
        try {
            const result = await BusinessServiceInstance.query(lat, lng, searchbox);
            res.send(result.data);
        } catch (e) {
            console.log(e);
        }
    }

    async getBusinessByID(req, res) {
        const result = await BusinessServiceInstance.getBusinessByID(req.params.id);
        res.send(result);
    }
}

module.exports = BusinessController;