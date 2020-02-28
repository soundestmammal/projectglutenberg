const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Define the User Model
const userSchema = new Schema({
    email: { type: String, lowercase: true, unique: true, required: true }, 
    password: { type: String, required: true }
});

// On save hook, encrypt password!!!
// Before saving a model, run this function.
userSchema.pre('save', function(next) {
    // user is an instance of the user model - user.email user.password
    const user = this;

    // Generate a SALT, then invoke the callback
    bcrypt.genSalt(10, function(err, salt) {

        if (err) { return next(err); }

        // Then hash/encrypt the password using the SALT (async)
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }

            // Here is where we overwrite the password with
            user.password = hash;
            next();
        });
    })
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;

