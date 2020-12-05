const { request } = require('express');
const sharp = require('sharp');
const User = require("../models/User")

class UserService {

    /**
     * @description Signup a new user
     */

    // Create a new user - signup
    async createUser(credentials) {
        const user = new User(credentials);
        try {
            await user.save();
            const token = await user.generateAuthToken();
            return ({ user, token });
        } catch (e) {
            return e;
        }
    }

    // Authenticate an existing user - login
    async loginUser(email, password) {
        try {
            const user = await User.findByCredentials(
                email,
                password
            );
            if (user.admin) {
                throw new Error('The user is an admin!!!');
            }
            const token = await user.generateAuthToken();
            return ({ success: true, user, token });
        }
        catch (e) {
            return ({ success: false, error: e });
        }
    }

    // Log a single user out on one device
    async logoutUser(user, deviceToken) {
        user.tokens = user.tokens.filter((token) => {
            return token.token !== deviceToken;
        });
        await user.save();
    }

    // Fetch uuid and avatar for auth user
    fetchUser(uuid, avatar) {
        const returnMe = {};
        returnMe['uuid'] = uuid;
        returnMe['avatar'] = avatar;
        return ({ success: true, data: returnMe });
    }

    // Upload an avatar
    async uploadAvatar(file, user) {
        try {
            const buffer = await sharp(file)
                .resize({ width: 250, height: 250 })
                .png()
                .toBuffer();
            user.avatar = buffer;
            await user.save();
            return ({ success: true });
        } catch (e) {
            return ({ success: false, error: e });
        }
    }

    // Delete an avatar
    async deleteAvatar(user) {
        user.avatar = undefined;
        await user.save();
        return ({ success: true });
    }

    // Get an avatar image
    async getAvatar(id) {
        try {
            const user = await User.findById(id);
            if (!user || !user.avatar) {
                throw new Error();
            }
            return ({ success: true, user });
        }
        catch (e) {
            return ({ success: true, error: e });
        }
    }

    // Delete Account
    async deleteAccount(user) {
        try {
            await user.remove();
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = UserService;