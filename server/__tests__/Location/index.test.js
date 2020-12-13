const nock = require('nock');
const LocationService = require('../../services/LocationService');
const LocationServiceInstance = new LocationService();
const { locationFixture, geocodeFixture } = require('../../locationFixture');

describe('Location Service', () => {
    describe('getClientLocation', () => {

        it("should return an object with two properties (latitude&&longitude)", async () => {
            nock('https://api.ipgeolocation.io')
                .get('/ipgeo?apiKey=undefined&ip=64.94.159.111')
                .reply(200, locationFixture)
        
            let ipAddress = '192.168.32'
            const response = await LocationServiceInstance.getClientLocation(ipAddress);
            expect(response).toHaveProperty('latitude');
            expect(response).toHaveProperty('longitude');
        });

        it("should return an object with valid lat&&long", async () => {
            nock('https://api.ipgeolocation.io')
                .get('/ipgeo?apiKey=undefined&ip=64.94.159.111')
                .reply(200, locationFixture)
            
            let ipAddress = '192.168.32'
            const { latitude, longitude } = await LocationServiceInstance.getClientLocation(ipAddress);
            expect(latitude).toEqual(locationFixture.latitude);
            expect(longitude).toEqual(locationFixture.longitude);
        });

        it('should throw an error if the service is down', async () => {
            nock('https://api.ipgeolocation.io')
                .get('/ipgeo?apiKey=undefined&ip=111.111.11')
                .reply(500);
            
            let ipAddress = '111.111.11';
            const response = await LocationServiceInstance.getClientLocation(ipAddress);
            expect(response).toHaveProperty('error');
        })

        it('should return an error if Dependency.api.ipgeolocation could not locate resource', async () => {
            nock('https://api.ipgeolocation.io')
                .get('/ipgeo?apiKey=undefined&ip=111.111.11')
                .reply(404);
            
            let ipAddress = '111.111.11';
            const response = await LocationServiceInstance.getClientLocation(ipAddress);
            expect(response).toHaveProperty('error');
        })
    });
    
    describe('Forward Geocode', () => {

        it('should return an object with properties latitude, longitude', async () => {
            nock('https://api.opencagedata.com')
                .get('/geocode/v1/json?q=Tuscaloosa&proximity=50,-100&key=undefined')
                .reply(200, geocodeFixture)
            
            let location = 'Tuscaloosa';
            let lat = 50;
            let lng = -100;
        
            const response = await LocationServiceInstance.forwardGeocode(location, lat, lng);
            expect(response.latitude).toEqual(geocodeFixture.results[0].geometry.location.lat);
            expect(response.longitude).toEqual(geocodeFixture.results[0].geometry.location.lng);
        });

        it('should throw an error if the service is down', async () => {
            nock('https://api.opencagedata.com')
                .get('/geocode/v1/json?q=Tuscaloosa&proximity=50,-100&key=undefined')
                .reply(500);
            
            let query = 'Tuscaloosa';
            let lat = 50;
            let lng = -100;

            const response = await LocationServiceInstance.forwardGeocode(query, lat, lng);
            expect(response).toHaveProperty('error');
        })

        it('should return an error if Dependency.api.ipgeolocation could not locate resource', async () => {
            nock('https://api.opencagedata.com')
                .get('//geocode/v1/json?q=Tuscaloosa&proximity=50,-100&key=undefined')
                .reply(404);
            
            let location = 'Tuscaloosa';
            let lat = 50;
            let lng = -100;

            const response = await LocationServiceInstance.forwardGeocode(location, lat, lng);
            expect(response).toHaveProperty('error');
        })
    })
});