const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    dob: Date,
    address: String,
    phone: String,
    state: String,
    zip: String,
    email: String,
    gender: String,
    userType: String
});

module.exports = mongoose.model('User', UserSchema);
