const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
        }
        /* I am going to want to have tokens here. probably stored as an array */
    }
);

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

