const request = require("supertest");
const app = require("../../app");
const UserService = require('../../services/UserService');

describe("User Service", () => {
    const UserServiceInstance = new UserService();
    it("should create an instance of service",  () => {
        expect(UserServiceInstance).toBeDefined();
    });

    describe("Create User Method", () => {
        it("should return the expected value of failure when receiving invalid input", () => {

        });

        it("should return the expect value of success when provided valid inputs", () => {

        });
    });

    describe("Login User Method", () => {
        it("should return the expected value of failure when receiving invalid input", () => {

        });

        it("should return the expect value of success when provided valid inputs", () => {

        });

    });

    describe("Log out user (single device)", () => {
        it("should return the expected value of failure when receiving invalid input", () => {

        });

        it("should return the expect value of success when provided valid inputs", () => {

        });
    });

    describe("POST: Upload an avatar image", () => {
        it("should return the expected value of failure when receiving invalid input", () => {

        });

        it("should return the expect value of success when provided valid inputs", () => {

        });
    });

    describe("DELETE: avatar image", () => {
        it("should return the expected value of failure when receiving invalid input", () => {

        });

        it("should return the expect value of success when provided valid inputs", () => {

        });
    });

    describe("GET: avatar image", () => {
        it("should return the expected value of failure when receiving invalid input", () => {

        });

        it("should return the expect value of success when provided valid inputs", () => {

        });
    });
});