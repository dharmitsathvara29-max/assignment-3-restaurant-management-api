const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    cuisine: {
        type: String,
        required: false
    },

    rating: {
        type: Number,
        required: false
    }

});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;