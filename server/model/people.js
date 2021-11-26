const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    }
}, {timestamps:true});

const People = mongoose.model('People', schema);

module.exports = People;