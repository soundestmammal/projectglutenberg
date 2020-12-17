const request = require("supertest");
const app = require("../app");

describe("Integration Tests", () => {

  // Location
  describe("Location related endpoints", () => {

    describe('GET /location/client', () => {
      it('should respond with 200 status code', async () => {
        const res = await request(app).get("/location/client");
        expect(res.statusCode).toEqual(200);
      });
      
      it('should respond with location data schema', async () => {
        const res = await request(app).get('/location/client');
        expect(res.body).toHaveProperty("latitude");
        expect(res.body).toHaveProperty("longitude");
      });

      it('should return with correct location', async () => {
        const res = await request(app).get('/location/client');
        expect(res.body.latitude).toEqual('33.76160');
        expect(res.body.longitude).toEqual('-84.39130');
      });
    });


    describe('GET /location/forwardgeocode', () => {
      it('should respond with 200 status code', async () => {
        const res = await request(app).get(
          "/location/forwardgeocode?location=sacramento&lat=33.74&lng=-110.52"
        );
        expect(res.statusCode).toEqual(200);
      });

      it('should respond with location data schema', async () => {
        const res = await request(app).get(
          "/location/forwardgeocode?location=sacramento&lat=33.74&lng=-110.52"
        );
        expect(res.body).toHaveProperty("latitude");
        expect(res.body).toHaveProperty("longitude");
      });

      it('should return with correct location', async () => {
        const res = await request(app)
          .get('/location/forwardgeocode?location=sacramento&lat=33.74&lng=-110.52');
        expect(res.body.latitude).toEqual(38.5810606);
        expect(res.body.longitude).toEqual(-121.4938951);
      });
    })
  });

  // business
  describe("Business related endpoints", () => {

    // Business Search
    it('Should respond with an array of 20 businesses', async () => {
      const res = await request(app).get('/yelp?searchbox=tacos&latitude=37.38&longitude=-122.08');
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toEqual(10);
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

    let token = ''

    afterAll(async () => {
      const res = await request(app)
        .delete('/users/me')
        .set('Authorization', 'Bearer ' + token);
    })

    // Create a user
    it('should response with the correct status code', async () => {
      const res = await request(app)
        .post('/users')
        .send({ email: 'create314@this.com', password: 'notarealpw', admin: false });
      
      token = res.body.token;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('uuid');
      expect(res.body).toHaveProperty('token');
      expect(res.body.token.length).toBe(149);
    })

    it('should not allow a duplicate user', async () => {
      const res = await request(app)
        .post('/users')
        .send({ email: 'create314@this.com', password: 'notarealpw', admin: false });
      
      expect(res.statusCode).toEqual(400);
    })

        // Log out a user
    it('should log out a user', async () => {
      // console.log('this is the first attempt to use token', token);
      const res = await request(app)
        .post('/users/logout')
        .set('Authorization', `Bearer ${token}`)
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.text).toEqual('Success');
    })

    it('should login a user', async () => {
    const res = await request(app)
        .post('/users/login')
        .send({ email: 'create314@this.com', password: 'notarealpw' });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('uuid');
      expect(res.body).toHaveProperty('token');
      token = res.body.token;
  });


  })

  describe('These are authenticated routes and I need to have an authentication token prior to running each test', () => {

    let token = '';
    let uuid = '';

    beforeAll( async () => {
      // I need to get an auth token...
      // Create the first user
      const res = await request(app)
        .post('/users')
        .send({ email: 'eric.reis123@oauth.com', password: 'continuous_innovation', admin: false })
      
      token = res.body.token;
      uuid = res.body.uuid;
    });

  // Login a user
  it('should login a user', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'eric.reis123@oauth.com', password: 'continuous_innovation' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('uuid');
    expect(res.body).toHaveProperty('token');
  });

  it('should not login a user with invalid credentials', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'eric.reis123@oauth.com', password: 'waterfall_method' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Invalid Credentials');
  });

  // fetch a user
    it('should fetch a uuid and avatar', async () => {
      const res = await request(app)
        .post('/fetchUser')
        .set('Authorization', `Bearer ${token}`)
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('uuid');
    })

  // upload an avatar
    // it('should upload an avatar', async () => {
    //   const res = await request(app)
    //     .post('/users/me/avatar')
    // })

  // delete avatar
    

  // get avatar
    // it('should get an avatar', async () => {
    //   const res = await request(app)
    //     .get(`/users/${uuid}/avatar`);
      
    //   expect(res.statusCode).toBe(200);
    // })

  // delete account
    it('should delete the user account', async () => {
      const res = await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
    })

  })
});
