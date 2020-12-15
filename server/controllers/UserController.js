const sharp = require('sharp');
const User = require("../models/User")

// Services
const UserService = require('../services/UserService');
const UserServiceInstance = new UserService();

class UserController {
    /**
     * @description Each method is a route handler for an API Endpoint
     * @param {req, res}
     * @return response for client
     */
    
     // Create a new user - signup
    async createUser(req, res) {
        const { body } = req;
        try {
            const result = await UserServiceInstance.createUser(body);
            const { user, token } = result;
            const _id = user._id;
            return res.status(201).send({ uuid: _id, token });
        } catch (e) {
            res.status(400).send(e);
        }
    }

    // Authenticate an existing user - login
    async loginUser(req, res) {
        const { email, password } = req.body;
        try {
            const result = await UserServiceInstance.loginUser(email, password);
            const { uuid, token } = result;
            res.status(201).send({ uuid, token });
        } catch (e) {
            res.status(400).send({error: "Invalid Credentials"});
        }
    }

    // Log a single user out on one device
    async logoutUser(req, res) {
        const { user, token } = req;
        try {
            await UserServiceInstance.logoutUser(user, token);
            res.status(201).send({ text: 'Success' });
        } catch (e) {
            res.status(500).send();
        }
    }

    // Fetch uuid and avatar for auth user
    fetchUser(req, res) {
        const { _id, avatar } = req.user;
        try {
            const { data } = UserServiceInstance.fetchUser(_id, avatar);
            res.status(200).send(data);
        } catch (e) {
            res.status(500).send();
        }
    }

    // Upload an avatar
    async uploadAvatar(req, res) {
        const { file, user } = req;
        try {
            await UserServiceInstance.uploadAvatar(file, user);
            res.send({ status: 'It was a huge success' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    // Delete an avatar
    async deleteAvatar(req, res) {
        const { user } = req;
        try {
            await UserServiceInstance.deleteAvatar(user);
            res.status(200).send({ status: 'successful delete!' });
        } catch (e) {
            res.status(500).send();
        }
    }

    // Get an avatar image
    async getAvatar(req, res) {
        const { id } = req.params;
        try {
            const result = await UserServiceInstance.getAvatar(id);
            const { avatar } = result.user;
            res.set('Content-Type', 'image/png');
            res.send(avatar);
        } catch (e) {
            res.status(404).send();
        }
    }

    // Delete Account
    async deleteAccount(req, res) {
        const { user } = req;
        try {
            await UserServiceInstance.deleteAccount(user);
            res.send(user);
        } catch (e) {
            res.status(500).send();
        }
    }
}

module.exports = UserController;