/**
 * Integration Tests
 * @group integration
 */

const request = require("supertest");
const app = require("../app");

describe("Integration Tests", () => {

  // Location
  describe("Location related endpoints", () => {

    // getClientLocation
    it("Should respond the user GPS coordinates", async () => {
      const res = await request(app).get("/getClientLocation");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("latitude");
      expect(res.body).toHaveProperty("longitude");
    });

    // forwardgeocode
    it("Should return the nearest city", async () => {
      const res = await request(app).get(
        "/forwardgeocode?location=sacramento&lat=33.74&lng=-110.52"
      );
      // console.log("This is the forwardGeocode", res.body);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("latitude");
      expect(res.body).toHaveProperty("longitude");
    });
  });

  // business
  describe("Business related endpoints", () => {

    // Business Search
    it('Should respond with an array of 20 businesses', async () => {
      const res = await request(app).get('/yelp?searchbox=tacos&latitude=37.38&longitude=-122.08');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data.length).toEqual(20);
    });

    // Business Detail
    it('should response with a single business object', async () => {
      const res = await request(app).get('/yelp/business/paMB0QBZZYZiZJwqGf3pCg');

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('phone');
    })
  });

  describe('User related endpoints', () => {

    // Create a user
    it('should response with the correct status code', async () => {
      const res = await request(app)
        .post('/users')
        .send({ email: 'this0@this.com', password: 'notarealpw', admin: false });
      
        expect(res.statusCode).toEqual(201);
    })

    it('should create a user', async () => {
      const res = await request(app)
        .post('/users')
        .send({ email: 'this1@this.com', password: 'notarealpw', admin: false });
      
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('token');
      expect(res.body.token.length).toBe(149);
    })
  })

});
