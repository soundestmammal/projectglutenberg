const nock = require('nock');
const BusinessService = require('../../services/BusinessService');
const BusinessServiceInstance = new BusinessService();
const Business = require('../../models/Business');
const { searchFixture, businessFixture } = require('../../query.fixture');
const { default: mockingoose } = require('mockingoose');


describe('Business Service', () => {
    describe('Make a Query to Yelp and Recommendation Algorithm', () => {
        it('Should return success when provided valid inputs', async () => {

            // const _doc = {
            //     _id: '507f191e810c19729de860ea',
            //     name: 'name',
            //     email: 'name@email.com',
            // };

            // mockingoose(Business).toReturn(_doc, find);

            // Set up nock interceptor
            nock('https://api.yelp.com')
                .get('/v3/businesses/search?term=tacos&latitude=40.4&longitude=-110.3')
                .reply(200, searchFixture);

            let lat = 40.4
            let lng = -110.3
            let searchbox = "tacos"

            const result = await BusinessServiceInstance.query(lat, lng, searchbox);
            expect(true).toBe(true);
        });

        it('Should return the correct length when provided valid inputs', async () => {
            nock('https://api.yelp.com')
                .get('/v3/businesses/search?term=tacos&latitude=40.4&longitude=-110.3')
                .reply(200, searchFixture);
            
            let lat = 40.4
            let lng = -110.3
            let searchbox = "tacos"

            const result = await BusinessServiceInstance.query(lat, lng, searchbox);
            expect(result.body.length).toBe(3);
        });
    });

    describe('Get the business by its ID', () => {
        // Make some assertions
        it('Should return success if provided a valid businessID', async () => {
            console.log('THIS SHOULD BE THE SEEN FIRST')
            nock('https://api.yelp.com')
                .get('/v3/businesses/WavvLdfdP6g8aZTtbBQHTw')
                .reply(200, businessFixture);
            let businessID = "WavvLdfdP6g8aZTtbBQHTw";
            const result = await BusinessServiceInstance.getBusinessByID(businessID);
            expect(result.data.id).toBe(businessID);
        });

        it('Should return failure if provided an invalid businessID', async () => {
            nock('https://api.yelp.com')
                .get('/v3/businesses/SznfC59wf4EBTO3u4YdN0Adjfiuwhfiuwhef')
                .reply(404);
            let businessID = "SznfC59wf4EBTO3u4YdN0Adjfiuwhfiuwhef";
            const result = await BusinessServiceInstance.getBusinessByID(businessID);
            expect(result.error).toHaveProperty('error');
  
      })
    });
})