const sharp = require('sharp');
const User = require("../models/User")

class UserController {
    /**
     * @description Each method is a route handler for an API Endpoint
     * @param {req, res}
     * @return res status and optional body
     */
    
     // Create a new user - signup
    async createUser(req, res) {
        const user = new User(req.body);
        try {
            await user.save();
            const token = await user.generateAuthToken();
            return res.status(201).send({ user, token });
        } catch (e) {
            res.status(400).send(e);
        }
    }

    // Authenticate an existing user - login
    async loginUser(req, res) {
        try {
            // find the user
            const user = await User.findByCredentials(
                req.body.email,
                req.body.password
            );

            // check if they are admin
            if (user.admin) {
                throw new Error('The user is an admin!!!');
            }

            const token = await user.generateAuthToken();
            res.status(201).send({ user, token });
        } catch (e) {
            res.status(400).send(e);
        }
    }

    // Log a single user out on one device
    async logoutUser (req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            });
            await req.user.save();
            res.status(201).send({ text: 'Success' });
        } catch (e) {
            res.status(500).send();
        }
    }

    // Fetch uuid and avatar for auth user
    fetchUser(req, res) {
        const returnMe = {};
        returnMe['uuid'] = req.user._id;
        returnMe['avatar'] = req.user.avatar;
        res.send(returnMe);
    }

    // Upload an avatar
    async uploadAvatar (req, res) {
        try {
            const buffer = await sharp(req.file.buffer)
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();
            req.user.avatar = buffer;
            await req.user.save();
            res.send({ status: 'It was a huge success' });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    // Delete an avatar
    async deleteAvatar (req, res) {
        req.user.avatar = undefined;
        await req.user.save();
        res.send({ status: 'successful delete!' });
    }

    // Get an avatar image
    async getAvatar (req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user || !user.avatar) {
                throw new Error();
            }
            res.set('Content-Type', 'image/png');
            res.send(user.avatar);
        } catch (e) {
            res.status(404).send();
        }
    }

    // Delete Account
    async deleteAccount (req, res) {
        try {
            await req.user.remove();
            res.send(req.user);
        } catch (e) {
            res.status(500).send();
        }
    }
}

module.exports = UserController;