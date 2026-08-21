const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({

    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    isAvailable: {
        type: Boolean,
        required: true
    }

});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;