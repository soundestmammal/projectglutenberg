const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');
const Schema = mongoose.Schema;

// Define the User Model
const userSchema = new Schema(
    {
        email: {
            type: String, 
            lowercase: true, 
            unique: true, 
            required: true,
            trim: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid submission, not a valid email.")
                }
            }
        }, 
        password: {
            type: String, 
            required: true,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if(value.includes("password")) {
                    throw new Error("Password can not be included in PW");
                }
            }
        },
        /* I am going to want to have tokens here. probably stored as an array */
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                }
            }
        ],
    },
);

// I need to generate an auth token and save it in the user model!
userSchema.methods.generateAuthToken = async function() {
    const user = this;

    // get a token
    const token = jwt.sign({_id: user.id.toString() }, jwtSecret);

    // add that token to the user model
    user.tokens = user.tokens.concat({ token });

    // save the user model
    await user.save();

    // return the token
    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user) {
        throw new Error("Unable to log in!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Unable to log in!");
    }

    return user;
}

// On save hook, encrypt password!!!
// Before saving a model, run this function.
userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

// Create the model class
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;

