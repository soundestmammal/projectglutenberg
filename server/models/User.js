const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User Model
const userSchema = new Schema({
    email: { type: String, lowercase: true, unique: true }, 
    password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;

