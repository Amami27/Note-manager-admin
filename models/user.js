const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fisrtName: String,
    lastName: String,
    email: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', userSchema)