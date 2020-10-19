const { response } = require("express");
const request = require("supertest");
const app = require("../app");

describe("Location related endpoints", () => {
  it("Should respond the user GPS coordinates", async () => {
    const res = await request(app).get("/location/ip");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("latitude");
    expect(res.body).toHaveProperty("longitude");
  });

  it("Should return the nearest city", async () => {
    const res = await request(app).get(
      "/location/forward_geocode?location=sacramento&lat=33.74&lng=84.52"
    );

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("lat");
    expect(res.body).toHaveProperty("lng");
  });

  it("Should return the reverse geocode", async () => {
    const res = await request(app)
      .get("/location/reverse_geocode")
      .expect(200)
      .expect("Content-Type", /json/);
  });
});
